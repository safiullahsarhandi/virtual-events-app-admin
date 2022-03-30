import AppRoot from "../../Components/AppRoot";
import EventTable from "./EventTable";

export default function EventLog() {
  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <EventTable label="Event Management" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
