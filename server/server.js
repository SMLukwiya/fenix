import config from '../config/config';
import app from './express';
import mongoose from 'mongoose';
import Employee from './models/employeeModel';
import Agenda from 'agenda';


//Database Connection URL
const url = config.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${url}`)
})


const mongoConnectionUrl = config.mongoUri
const agenda = new Agenda({db: {address: mongoConnectionUrl}});

///***Schedule employee points to update monthly***///
//Define a job updatePoints that runs every month
agenda.define('updatePoints', (job, done) => {
  //Map through array returned from data base and update all points
  Employee.find({}).map((employee)=> {
    //Get the tenure of the employee
    let years = (employee) => {
      return (new Date().getFullYear() - new Date(employee).getFullYear());
    }

    let tenure = years(employee.created)
    let seniority = employee.seniority

    //Calculate employee points
    const totalPoints = () => {
      if ((seniority === 'A') && (tenure >= 0 && tenure < 2)) {
        return 5*100;
      }
      if ((seniority === 'B') && (tenure >= 0 && tenure < 2)) {
        return 10*100;
      }
      if ((seniority === 'C') && (tenure >= 0 && tenure < 2)) {
        return 15*100;
      }
      if ((seniority === 'D') && (tenure >= 0 && tenure < 2)) {
        return 20*100;
      }
      if ((seniority === 'E') && (tenure >= 0 && tenure < 2)) {
        return 25*100;
      }
      if ((seniority === 'A') && (tenure >= 2 && tenure < 4)) {
        return 5*125;
      }
      if ((seniority === 'B') && (tenure >= 2 && tenure < 4)) {
        return 10*125;
      }
      if ((seniority === 'C') && (tenure >= 2 && tenure < 4)) {
        return 15*125;
      }
      if ((seniority === 'D') && (tenure >= 2 && tenure < 4)) {
        return 20*125;
      }
      if ((seniority === 'E') && (tenure >= 2 && tenure < 4)) {
        return 25*125;
      }
      if ((seniority === 'A') && (tenure >= 4)) {
        return 5*150;
      }
      if ((seniority === 'B') && (realTenure >= 4)) {
        return 10*150;
      }
      if ((seniority === 'C') && (trealTenure >= 4)) {
        return 15*150;
      }
      if ((seniority === 'D') && (realTenure >= 4)) {
        return 20*150;
      }
      if ((seniority === 'E') && (realTenure >= 4)) {
        return 25*150;
      }
    }

    //update employee points
    employee.points = employee.points + totalPoints();
    done();

  })
});

(async function() { // IIFE to give access to async/await
  try {
    await agenda.start();//start the event and run on the 1st day of every month

    await updatePoints.repeatEvery('* * 1 * *').save();
  }
//Handle error
  catch (error) {
    return ('Error while updating points')
  }

})();


app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
});
