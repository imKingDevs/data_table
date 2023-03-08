import React from 'react'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react';
import axios from 'axios';

const CountrisTable = () => {

    const [countries, setcountries] = useState([])
    const [search, setsearch] = useState("")
    const [filteredCountries, setfilteredCountries] = useState([])

    const getcountries = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v2/all`)
            setcountries(response.data);
            setfilteredCountries(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getcountries();
    }, [])

    useEffect(() => {
        const result = countries.filter(country => {
            return country.name.toLowerCase().match(search.toLowerCase())
        })

        setfilteredCountries(result)
    }, [search])


    const columns = [
        {
            name: "Country name",
            selector: (row) => row.name,
        },
        {
            name: "Country Native name",
            selector: (row) => row.nativeName,
            sortable: true,
        },
        {
            name: "Country Capital name",
            selector: (row) => row.capital,
        },
        {
            name: "Country Flag",
            selector: (row) => <img src={row.flag} height={40} style={{ border: '1px solid #000' }} />,
        },
        {
            name: "Action",
            cell: (row) => (<button onClick={() => alert(row.name)}>Edit</button>),
        },
    ];

    return (
        <DataTable
            title="Country Data"
            fixedHeader
            fixedHeaderScrollHeight='470px'
            columns={columns}
            data={filteredCountries}
            pagination
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            theme='dark'
            actions={<button>Export</button>}
            subHeader
            subHeaderComponent={
                <input type='text'
                    placeholder='Search here..'
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                />}
            subHeaderAlign="center"
        />
    )
}

export default CountrisTable