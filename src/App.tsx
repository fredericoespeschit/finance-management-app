import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
//import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';

const App = () => {
  const [list, setList] = useState(items); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth()); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [income, setIncome] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [expense, setExpense] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars


  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);


  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }
  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {/* Área de Informações */}
        <InfoArea 
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        income={income}
        expense={expense}
        />


        {/* Área de Inserção */}


        {/* Área de Listagem */}
        <TableArea list={filteredList} />
        
      </C.Body>
    </C.Container>
  );
};

export default App;
