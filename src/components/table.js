import React from 'react'
import { Table, Container } from 'semantic-ui-react'

const TableData = ({data, mark}) => {


    if(data.length > 0){

        //get keys from json for headers
        const keys = Object.keys(data[0]);

        //map keys and display as table headers
        const displayHeaders = keys.map( (head, i) =>  <Table.HeaderCell key={i} >{head}</Table.HeaderCell> );
        
        // map all objects in data array
        // map object for values and display as cell on table
                    // find a better way!!!!!!
        const displayBody = data.map( (obj, i) => {
            return(
            <Table.Row key={i}>{ Object.values(obj).map( (val, k) => {
                        if(val.toString().includes(mark) & mark !== '') return <Table.Cell key={k} bgcolor={'yellow'}>{val}</Table.Cell>
                        return <Table.Cell key={k}>{val}</Table.Cell> 
                    }) 
                } 
            </Table.Row>
            )
        });

        return (
            <Container>
                
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            {displayHeaders}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {displayBody}
                    </Table.Body>
                </Table>

            </Container>
        );
    }

    return (
        <div>
            <h1>No results</h1>
        </div>
    )
}

export default TableData;