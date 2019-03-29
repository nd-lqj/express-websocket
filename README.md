### 这个主要是学习express框架和express-ws插件的使用。
---
### 遇到的问题

#### 1、websocket连接，直接返回200，无法建立连接。
_之前一直纠结是不是因为端口号3000被http协议占用了，所以无法建立socket连接。_
##### 与创建server的方式有关。
+ 如果app自己建立服务的话，可以参考官网的方式，直接对app调用expressWs(app)方法，然后启用app.listen(3000)。
+ 如果是http运行的服务，必须在服务创建之后，调用expressWs(app, server)。

##### 之前直接返回200的原因：
  + 返回200因为expressWs方法在调用过程中没有把正确的server做参数给expressWs。
  + 端口号3000是http的server监听的。http的server并没有被expressWs处理过。
  + 端口号3001是app自己通过listen监听的。app被expressWs处理过了。所以可以正常使用websocket
##### 发现这个情况，是因为看了expressWs的源码，发现expressWs可以有三个参数
```
declare function expressWs(app: express.Application, server?: http.Server | https.Server, options?: expressWs.Options): expressWs.Instance;
```
---
#### demo运行启动
```
npm start
```
---
#### demo页面访问路径
```
http://localhost:3000/websocket
```
---