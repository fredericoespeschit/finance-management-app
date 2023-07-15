import * as C from "./styles";
import { Item } from "../../types/Item";
import { useState } from "react";
import { categories } from "../../data/categories";
import { newDateAdjusted } from "../../helpers/dateFilter";

type Props = {
  onAdd: (item: Item) => void;
};
export const InputArea = ({ onAdd }: Props) => {
  // const handleAddEvent = () => {
  //   let newItem: Item = {
  //     date: new Date(2023, 7, 25),
  //     category: "salary",
  //     title: "Extra",
  //     value: 250.5,
  //   };
  //   onAdd(newItem);
  // };

  const [dateField, setDateField] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [titleField, setTitleField] = useState("");
  const [valueField, setValueField] = useState(0);

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if (isNaN(new Date(dateField).getTime())) {
      errors.push("Data Inválida");
    }
    if (!categoryKeys.includes(categoryField)) {
      errors.push("Categoria invalida");
    }
    if (titleField === "") {
      errors.push("Titulo Vazio");
    }
    if (valueField <= 0) {
      errors.push("Valor inválido!");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: newDateAdjusted(dateField),
        category: categoryField,
        title: titleField,
        value: valueField,
      });
      clearFields();
    }
  };

  const clearFields = () => {
    setDateField("");
    setCategoryField("");
    setTitleField("");
    setValueField(0);
  };

  return (
    <C.Container>
      <C.InputLabel>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input
          type="date"
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        />
      </C.InputLabel>

      <C.InputLabel>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
        >
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </>
        </C.Select>
      </C.InputLabel>

      <C.InputLabel>
        <C.InputTitle>Titulo</C.InputTitle>
        <C.Input
          type="text"
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
        />
      </C.InputLabel>

      <C.InputLabel>
        <C.InputTitle>Valor</C.InputTitle>
        <C.Input
          type="number"
          value={valueField}
          onChange={(e) => setValueField(parseFloat(e.target.value))}
        />
      </C.InputLabel>

      <C.InputLabel>
        <C.InputTitle>&nbsp;</C.InputTitle>
        <button onClick={handleAddEvent}>Adicionar</button>
      </C.InputLabel>
    </C.Container>
  );
};
