import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteComponent from './routes/router';
import MyContext from './contexts/appContext';
export default function App() {
  return (
      <MyContext>
        <RouteComponent />
      </MyContext>
  )
}
