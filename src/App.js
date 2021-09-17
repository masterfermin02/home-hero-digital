import Form from './components/form';
import './App.scss';
import validate from './utils/validate';

import { createServer } from "miragejs"

createServer({
  routes() {
    this.post("/api/subscription", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      let newErrors = validate(attrs, true);
      if(Object.keys(newErrors).length > 0) {
        return { 
          "status": "error", 
          "message": "Invalid Subscription request." 
        };
      }
      return { 
        "status": "success", 
        "message": "Thank you. You are now subscribed." 
       };
    })
  },
});


function App() {

  return (
    <div className="App">
      <main>
          <div className="header">
            <h1>Sign up for email updates</h1>
            <h4 className="subtitle">*Indicates Required Field</h4>
          </div>
          <Form />
      </main>
    </div>
  );
}

export default App;
