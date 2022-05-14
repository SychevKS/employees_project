import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data}) => {

    const elements = data.map(item => {
        const {id, ...items} = item

        return (
            <EmployeesListItem key={id} {...items}/>
            //Упрощение кода: name={item.name} salary={item.salary} => {...item}
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;