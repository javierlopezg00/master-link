import * as React from 'react';
import CreateUserButton from '../Components/UsersTable/CreateUserButton';
import UserTablesComponent from '../Components/UsersTable/UserTablesComponent';

export default function UserTables() {
 

  return (
    <div style={{padding:"3%"}}>
        <CreateUserButton/>
        <UserTablesComponent />
    </div>
   
  );
}