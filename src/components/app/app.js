import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Kirill S.', salary: 1488, increase: false, rise: true, id: 1},
                { name: 'Pasha A.', salary: 1500, increase: false, rise: false, id: 2},
                { name: 'Anton F.', salary: 1289, increase: false, rise: false, id: 3}
            ],
            id: 4,
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        if(name !== '' & salary !== '') {
            this.setState(({data, id}) => {
                const newArr = [...data, {name: name, salary: salary, increase: false, id: id}]
                return {
                    data: newArr,
                    id: id + 1
                }
            })
        }
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, increase: !item.increase};
                }
                return item;
            })
        }))
    }
    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise};
                }
                return item;
            })
        }))
    }

    counterEmployee = () => {
        return this.state.data.length;
    }
    counterBonus = () => {
        return this.state.data.filter(item => item.increase === true).length
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    filterEmp = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }
    onFilterSelect = (filter) => {
        this.setState({filter: filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                counterEmployee={this.counterEmployee}
                counterBonus={this.counterBonus}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;
