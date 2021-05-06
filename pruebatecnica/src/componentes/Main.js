import { useState, useEffect} from 'react';
//import SortingTable from './SortingTable'
//import FilteringTable from './FilteringTable'
import PaginationTable from './PaginationTable'

const Main = () => {
    const [data, setData] = useState([]);

// As componentDidMount()
useEffect(() => {
    const loadData = async () => {
      const newData = await fetch('http://localhost:8080/searchAllArticles')
      .then(response => response.json())
      .then(res => setData([...data, ...res.data]));
    }
    console.log("Retrieving data...")
    loadData();
}, [])

console.log(data);

return (
  <main>
    {/* <SortingTable data={data} /> */}
    {/* <FilteringTable data={data} /> */}
    <PaginationTable data={data} />
  </main>
  );
}

export default Main;
