const domContainer = document.querySelector('#root');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
    }
    this.ws = new WebSocket("ws://localhost:3000/websocket");
    // this.ws = new WebSocket("wss://echo.websocket.org");
  }
  componentDidMount() {
    console.log('app componentDidMount---');
    this.ws.onopen = function(evt) { 
      console.log(`Connection open ...${new Date()}`); 
    };
    const that = this;
    this.ws.onmessage = function(evt) {
      console.log( "Received Message: " + evt.data);
      const { messageList } = that.state;
      messageList.push(JSON.parse(evt.data));
      that.setState({
        messageList
      })
    };
    this.ws.onclose = function(evt) {
      console.log(`Connection closed.${new Date()}`);
    };
  }
  componentWillUnmount() {
    this.ws.close();
  }
  sendMessage = () => {
    const { message } = this.state;
    console.log( "Send Message: " + JSON.stringify({from: 'self', message: `${message}`}));
    this.ws.send(JSON.stringify({from: 'self', message: `${message}`}));
  }
  onMessageChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  render() {
    const { messageList } = this.state
    return [
      <div
        key="header"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 62,
          textAlign: 'center',
          paddingTop: 40,
          background: 'palevioletred'
        }}
      >welcome!</div>,
      <div
        key="messageList"
        style={{
          position: 'absolute',
          top: 130,
          left: 20,
          right: 20,
          bottom: 100,
          border: '1px solid red',
        }}
      >
      {
        messageList.map((item) => {
          return <p
            key={item.key}
            style={{
              textAlign: item.from === 'self' ? 'right' : 'left',
              minHeight: 22,
              marginBottom: 20,
            }}>{item.message}</p>
        })
      }
      </div>,
      <div
        key="input"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'lightsteelblue',
          padding: 20,
          height: 32
        }}
      >
        <input onChange={this.onMessageChange} />
        <button onClick={this.sendMessage}>发送消息</button>
      </div>
    ]
  }
}
ReactDOM.render(<App />, domContainer);
