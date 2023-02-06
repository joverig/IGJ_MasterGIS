let todoslosmeses = ['enero','febrero','marzo','abril', 'mayo','junio','julio' ,'agosto','septiembre','octubre','noviembre','diciembre']
function checklongmonth(a){
    return a.length > 7
};
let meseslargos = todoslosmeses.filter(checklongmonth)
meseslargosmayus = meseslargos.map(uppercase)
function uppercase(j){
    return j.toUpperCase()
}
console.log(meseslargosmayus)