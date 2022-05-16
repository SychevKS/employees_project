import "./app-info.css";

const AppInfo = (props) => {
    const { counterEmployee, counterBonus } = props;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {counterEmployee()}</h2>
            <h2>Премию получат: {counterBonus()}</h2>
        </div>
    )
}

export default AppInfo;