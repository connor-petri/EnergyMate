import "./Dashboard.css";

const Dashboard = () =>{

    return (
        <div className="embed">
          <h1 id="h1">Energy Mate Dashboard</h1>

          <iframe
            title="Embedded Web Page"
            src="https://thingspeak.com/channels/2314358/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Power+of+Device+w%2Fh&type=line"
            width="700"
            height="400"
          />
          <iframe
            title="Embedded Web Page"
            src="https://thingspeak.com/channels/2314358/widgets/729853"
            width="700"
            height="400"
          />
          <iframe
            title="Embedded Web Page"
            src="https://thingspeak.com/channels/2314358/widgets/730010"
            width="700"
            height="400"
          />
          <iframe
            title="Embedded Web Page"
            src="https://thingspeak.com/channels/2314358/widgets/730047"
            width="700"
            height="400"
          />
        </div>

    )
}

export default Dashboard;