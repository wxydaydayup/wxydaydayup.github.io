---
tags:
  - shiro
author: WangXinYi
img: /images/homePage/Shiro.webp
summary: shiro认证、授权、整合Redis会话管理
categories:
  - shiro
typora-root-url: ..
date: 2023-3-18 12:06:57
---

# Shiro

如果项目基于微服务构建，所以在使用Shiro鉴权的时候，就需要将认证信息保存到统一的redis服务器中完成。

这样，每个微服务都可以通过指定cookie中的sessionid
获取公共的认证信息。

### 一、搭建环境

#### 1、导入依赖

父工程导入Shiro的依赖

```xml
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifactId>shiro-spring</artifactId>
  <version>1.3.2</version>
</dependency>
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifactId>shiro-core</artifactId>
  <version>1.3.2</version>
</dependency>
<dependency>
  <groupId>org.crazycake</groupId>
  <artifactId>shiro-redis</artifactId>
  <version>3.0.0</version>
</dependency>
```

#### 2、配置值对象

不需要存入redis太多的用户数据，和获取用户信息的返回对象一致即可，需要实现AuthCachePrincipali接口

```java
@Setter
@Getter
public class ProfileResult implements Serializable,AuthCachePrincipal {
    private String mobile;
    private String username;
    private String company;
    private String companyId;
    private Map<String,Object> roles = new HashMap<>();
    //省略
}
```

#### 3、配置未认证controller

为了在多个微服务中使用，配置公共的未认证未授权的Controller

```java
@RestController
@CrossOrigin
public class ErrorController {
    //公共错误跳转
    @RequestMapping(value="autherror")
    public Result autherror(int code) {
        return code == 1 ? new Result(ResultCode.UNAUTHENTICATED) : new Result(ResultCode.UNAUTHORISE);
    }
}
```

#### 4、自定义realm授权

common模块下创建公共的认证与授权realm，需要注意的是，此realm只处理授权数据即可，认证方法需要在登录模块中补全

```java
public class IhrmRealm extends AuthorizingRealm {
    @Override
    public void setName(String name) {
        super.setName("ihrmRealm");
    }
    //授权方法
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //1.获取安全数据
        ProfileResult result = (ProfileResult)principalCollection.getPrimaryPrincipal();
        //2.获取权限信息
        Set<String> apisPerms = (Set<String>)result.getRoles().get("apis");
        //3.构造权限数据，返回值
        SimpleAuthorizationInfo info = new  SimpleAuthorizationInfo();
        info.setStringPermissions(apisPerms);
        return info;
    }
    /**
  	* 认证方法
  	*/
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken
  authenticationToken) throws AuthenticationException {
        return null;
    }
}
```

#### 5、自定义会话管理

之前的程序使用jwt的方式进行用户认证，前端发送后端的是请求头中的token。为了适配之前的程序，在shiro中
需要更改sessionId的获取方式。很好解决，在shiro的会话管理中，可以轻松的使用请求头中的内容作为sessionid

```java
public class IhrmWebSessionManager extends DefaultWebSessionManager {
      private static final String AUTHORIZATION = "Authorization";
      private static final String REFERENCED_SESSION_ID_SOURCE = "Stateless request";
      public IhrmWebSessionManager() {
        super();
      }
      protected Serializable getSessionId(ServletRequest request, ServletResponse response){
        String id = WebUtils.toHttp(request).getHeader(AUTHORIZATION);
        if(StringUtils.isEmpty(id)){
          //如果没有携带id参数则按照父类的方式在cookie进行获取
          return super.getSessionId(request, response);
        } else {
          id = id.replace("Bearer ", "");
          //如果请求头中有 authToken 则其值为sessionId
		  request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_SOURCE,
                             REFERENCED_SESSION_ID_SOURCE);
          request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID,id);
          request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_IS_VALID,
                               Boolean.TRUE);
          return id;
       }
    }
}
```

### 二、用户认证

#### 1、配置用户登录

```java
//用户名密码登录
@RequestMapping(value="/login",method = RequestMethod.POST)
public Result login(@RequestBody Map<String,String> loginMap) {
    String mobile = loginMap.get("mobile");
    String password = loginMap.get("password");
    try {
        //1.构造登录令牌 UsernamePasswordToken
        //加密密码
        password = new Md5Hash(password,mobile,3).toString();  //1.密码，盐，加密次数
        UsernamePasswordToken upToken = new UsernamePasswordToken(mobile,password);
        //2.获取subject
        Subject subject = SecurityUtils.getSubject();
        //3.调用login方法，进入realm完成认证
        subject.login(upToken);
        //4.获取sessionId
        String sessionId = (String)subject.getSession().getId();
        //5.构造返回结果
        return new Result(ResultCode.SUCCESS,sessionId);
    }catch (Exception e) {
        return new Result(ResultCode.MOBILEORPASSWORDERROR);
    }
}
```

#### 2、shiro认证

配置用户登录认证的realm域，只需要继承公共的IhrmRealm补充其中的认证方法即可

```java
public class UserIhrmRealm extends IhrmRealm {
    @Override
    public void setName(String name) {
        super.setName("customRealm");
    }
    @Autowired
    private UserService userService;

    //认证方法
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException 
    {
        //1.获取用户的手机号和密码
        UsernamePasswordToken upToken = (UsernamePasswordToken) authenticationToken;
        String mobile = upToken.getUsername();
        String password = new String( upToken.getPassword());
        //2.根据手机号查询用户
        User user = userService.findByMobile(mobile);
        //3.判断用户是否存在，用户密码是否和输入密码一致
        if(user != null && user.getPassword().equals(password)) {
            //4.构造安全数据并返回（安全数据：用户基本数据，权限信息 profileResult）
            ProfileResult result = null;
            if("user".equals(user.getLevel())) {
                result = new ProfileResult(user);
            }else {
                Map map = new HashMap();
                if("coAdmin".equals(user.getLevel())) {
                    map.put("enVisible","1");
                }
                List<Permission> list = permissionService.findAll(map);
                result = new ProfileResult(user,list);
            }
            //构造方法：安全数据，密码，realm域名
            SimpleAuthenticationInfo info = new
                SimpleAuthenticationInfo(result,user.getPassword(),this.getName());
            return info;
        }
        //返回null，会抛出异常，标识用户名和密码不匹配
        return null;
    }
}
```

### 三、用户授权

在需要使用的接口上配置@RequiresPermissions("API-USER-DELETE")

#### 四、shiro的配置

构造shiro的配置类

```java
@Configuration
public class ShiroConfiguration {
    @Value("${spring.redis.host}")
    private String host;
    @Value("${spring.redis.port}")
    private int port;
    
    //配置自定义的Realm
    @Bean
    public IhrmRealm getRealm() {
        return new UserIhrmRealm();
    }
    
    //配置安全管理器
    @Bean
    public SecurityManager securityManager() {
        //使用默认的安全管理器
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 自定义session管理 使用redis
        securityManager.setSessionManager(sessionManager());
        // 自定义缓存实现 使用redis
        securityManager.setCacheManager(cacheManager());
        //将自定义的realm交给安全管理器统一调度管理
        securityManager.setRealm(getRealm());
        return securityManager;
    }
    
    //Filter工厂，设置对应的过滤条件和跳转条件
    @Bean
    public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
        //1.创建shiro过滤器工厂
        ShiroFilterFactoryBean filterFactory = new ShiroFilterFactoryBean();
        //2.设置安全管理器
        filterFactory.setSecurityManager(securityManager);
        //3.通用配置（配置登录页面，登录成功页面，验证未成功页面）
        filterFactory.setLoginUrl("/autherror?code=1"); //设置登录页面
        filterFactory.setUnauthorizedUrl("/autherror?code=2"); //授权失败跳转页面
        //4.配置过滤器集合
        /**
        * key ：访问连接
        *   支持通配符的形式
        * value：过滤器类型
        *   shiro常用过滤器
        *     anno  ：匿名访问（表明此链接所有人可以访问）
        *     authc  ：认证后访问（表明此链接需登录认证成功之后可以访问）
        */
        Map<String,String> filterMap = new LinkedHashMap<String,String>();
        //配置请求连接过滤器配置
        //匿名访问（所有人员可以使用）
        filterMap.put("/frame/login", "anon");
        filterMap.put("/autherror", "anon");
        //认证之后访问（登录之后可以访问）
        filterMap.put("/**", "authc");
        //5.设置过滤器
        filterFactory.setFilterChainDefinitionMap(filterMap);
        return filterFactory;
    }
    
    //配置shiro注解支持
    @Bean
    public AuthorizationAttributeSourceAdvisor
        authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor advisor = new
            AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(securityManager);
        return advisor;
    }
    
    //配置shiro redisManager
    public RedisManager redisManager() {
        RedisManager redisManager = new RedisManager();
        redisManager.setHost(host);
        redisManager.setPort(port);
        return redisManager;
    }
    
    //cacheManager缓存 redis实现
    public RedisCacheManager cacheManager() {
        RedisCacheManager redisCacheManager = new RedisCacheManager();
        redisCacheManager.setRedisManager(redisManager());
        return redisCacheManager;
    }
    
    /**
     * RedisSessionDAO shiro sessionDao层的实现 通过redis
     * 使用的是shiro-redis开源插件
     */
    public RedisSessionDAO redisSessionDAO() {
        RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
        redisSessionDAO.setRedisManager(redisManager());
        return redisSessionDAO;
    }
    /**
     * shiro session的管理
     */
    public DefaultWebSessionManager sessionManager() {
        IhrmWebSessionManager sessionManager = new IhrmWebSessionManager();
        sessionManager.setSessionDAO(redisSessionDAO());
        return sessionManager;
    }
}
```

