import { APPLICATION_CONFIG } from "./applicationConfig";
import { MainApp } from "./src/mainApp";

(async() => {
  const application = await MainApp.createClassInstance();

  if(APPLICATION_CONFIG.DEBUG_APPLICATION){
    //* We can inspect code in the debugger at chrome://inspect/#devices
    //@ts-ignore
    global.MainApplication = application
  }
})()
