import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
//import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';

const App = () => {
  const [list, setList] = useState(items); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth()); // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>

        <TableArea list={filteredList} />
        
      </C.Body>
    </C.Container>
  );
};

export default App;
