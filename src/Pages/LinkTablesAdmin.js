import * as React from 'react';
import CreateLinkButton from '../Components/LinkTable/CreateLinkButton';
import LinkTablesComponent from '../Components/LinkTable/LinkTablesComponent';

export default function LinkTablesAdmin() {
 

  return (
    <div style={{padding:"3%"}}>
        <CreateLinkButton/>
        <LinkTablesComponent />
    </div>
   
  );
}