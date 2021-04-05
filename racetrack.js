
let monthArr = [];
let weekArr = [];

function createTable(arr, row_key, col_key, val_key, n_row_headers, n_col_headers) {

 let data = {}; // A TEMPORARY OBJECT
 let cells = {};

 let table = document.createElement('table');
 //table.classList.add('table');

 // ESTABLISH DIMENSIONS OF TABLE AND CREATE AN OBJECT OF NAMED OBJECTS
 let m_max = 1;
 let m_min = 999;
 let n_max = 1;
 let n_min = 999;
 for (let i = 0; i < arr.length; i++) {
  let x = parseInt(arr[i][col_key]);
  let y = parseInt(arr[i][row_key]);
  if (y > m_max) {
   m_max = y;
  }
  if (y < m_min) {
   m_min = y;
  }
  if (x > n_max) {
   n_max = x;
  }
  if (x < n_min) {
   n_min = x;
  }
  
  // THIS DATA OBJECT IS A TEMPORARY THING
  // IT STORES ROW DATA, MAPPED BY THE row_key and col_key, NOT THE CELLS EVENTUAL POSITION IN THE TABLE
  data['r' + y + 'c' + x] = arr[i]; 
 }
 
 let y_row = 0;

 
   // ADD ONE ROW FOR EACH COLUMN HEADER, AND POPULATE WITH CELLS
   if (n_col_headers > 0) {
   
    for (let y = 0; y < n_col_headers; y++) {
      let row = createRow();
      table.appendChild(row);
      y_row++;
      let x_col = 0;

    for (let x = 0; x < n_row_headers; x++) {
      let cell = createCell();
      row.appendChild(cell);
      x_col++;
      cell.classList.add('row_' + y_row);  // SO ROWS START AT 1
      cell.id = 'r' + y_row + 'c' + x_col;
      cell.classList.add('header_header');
      
      if (y === 0) {
       cell.appendChild(createInner('MONTH'));
      }
      if (y === 1) {
       cell.appendChild(createInner('WEEK'));
      }
      cell.style.textAlign = 'right';
    }
    
    // NOW MAKE THE ACTUAL COLUMN HEADERS
   

    if (y === 0) {
     let obj = getUniqueAndCount(arr,"month_abs", "day_abs")
     //console.log(obj);
     monthArr = [];
    for (let x = 0; x < Object.keys(obj).length; x++) {
      let w = obj[Object.keys(obj)[x]].length;
      //console.log(w);
      monthArr.push(w);
      let month_abs = Object.keys(obj)[x];
      let month_no = (month_abs-1) % 12 + 1;
      let cell = createCell();
      row.appendChild(cell);
      cell.colSpan = w;
      x_col++;
      cell.classList.add('row_' + y_row);  // SO ROWS START AT 1
      cell.id = 'r' + y_row + 'c' + x_col;
      cell.style.border = '1px solid #999';
      cell.appendChild(createInner(month_no));
    }

    }
    
    if (y === 1) {
     let obj = getUniqueAndCount(arr,"week_abs", "day_abs")
     weekArr = [];
     for (let x = 0; x < Object.keys(obj).length; x++) {
      let w = obj[Object.keys(obj)[x]].length;
      weekArr.push(w);
      //console.log(w);
      let month_abs = Object.keys(obj)[x];
      let month_no = (month_abs-1) % 52 + 1;
      let cell = createCell();
      row.appendChild(cell);
      cell.colSpan = w;
      x_col++;
      cell.classList.add('row_' + y_row);  // SO ROWS START AT 1
      cell.id = 'r' + y_row + 'c' + x_col;
      cell.style.border = '1px solid #999';
      cell.style.fontFamily = 'monospace';
      
      if (month_no < 10) {
        month_no = '0' + month_no;
      }
      
      cell.appendChild(createInner(month_no));
     }

    }
    
    
    
    
    
    /*
     loop over arr
     count how many unique things there are with arr[i][key] either month or week_abs etc.
     then make an object to store the results
     then loop over the results, making a td for each one, with colspan equivalent to the count
     
    
    
    
    */
     

     
     
    }
   } 
   
 // CREATE THE ROWS
 for (let y = m_min; y <= m_max; y++) {

let row = createRow();
table.appendChild(row);
y_row++;
let x_col = 0;
     
     
   // ADD HEADER CELLS
   if (n_row_headers > 0) {
    for (let x = 0; x < n_row_headers; x++) {
     let cell = createCell();
     row.appendChild(cell);
     x_col++;
      cell.classList.add('row_' + y_row);  // SO ROWS START AT 1
      cell.id = 'r' + y_row + 'c' + x_col;
      cell.classList.add('row_header');
      cell.style.textAlign = 'left';
      cell.style.border = '1px solid #999';
     cell.appendChild(createInner(activities[y].desc)); // CREATE AND APPEND INNER
    }

   }     
     

  for (let x = n_min; x <= n_max; x++) {

   // CREATE CELL
   let cell = createCell();
   row.appendChild(cell);
   x_col++;
   cell.classList.add('row_' + y_row);
   cell.classList.add('col_' + x_col);
   cell.id = 'r' + y_row + 'c' + x_col;
      
      
   // CELL OBJECT : THE CELL.ID IS THE CELLS LOCATION IN THE TABLE
   // BUT ITS VALUE WILL COME FROM THE TEMPORARY DATA OBJECT, WHERE DATA IS MAPPED BY row_key AND col_key
   cells[cell.id] = {};
   cells[cell.id].data = (data['r' + y + 'c' + x] || {}); // tricky: every cell needs a data object, even if it is empty. cannot be null

   let val = (cells[cell.id].data[val_key] || null); // TRICKY
   
   if (val) {
     cell.classList.add('activity_no_' + (cells[cell.id].data[row_key]));
   }
   
   // CREATE AND APPEND INNER
   cell.appendChild(createInner(null)); // no value
       
  }
 }
 
 return {
  'table': table,
  'cells': cells,
  'cell': function(y, x) {
    return document.getElementById('r' + y + 'c' + x);
  }
 };

}

let activities = {
 1:{'desc':'RECEIPT','desc_long':'ORDER RECEIPT','color':'#ecf9ec'},
 2:{'desc':'REVIEW','desc_long':'ORDER REVIEW','color':'#c8eac8'},
 3:{'desc':'PLANNING','desc_long':'PRODUCTION PLANNING','color':'#ffeecc'},
 4:{'desc':'PRODUCTION','desc_long':'VERY PRODUCTION','color':'#ffdd99'},
 5:{'desc':'SHIPPING','desc_long':'MOST SHIPPING','color':'#99c2ff'},
 6:{'desc':'BUFFER','desc_long':'SHIPPING BUFFER','color':'#cce0ff'}
}

function createRow() {
  let row = document.createElement('tr');
  //row.classList.add('row');
  return row;
}
function createCell() {
  let cell = document.createElement('td');
  //cell.classList.add('cell');
  return cell;
}
function createInner(x) {
  let inner = document.createElement('div');
  inner.classList.add('inner');
  inner.innerHTML = x;
  return inner;
}

function getUniqueAndCount(arr, key, key2) {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    
    if (obj[arr[i][key]]) {
      // test if we have the value
      
      if (obj[arr[i][key]].indexOf(arr[i][key2]) === -1) {
        obj[arr[i][key]].push(arr[i][key2]);
      }
      
    } else {
      obj[arr[i][key]] = [];
      obj[arr[i][key]].push(arr[i][key2]);
    }
    

    
  }
  return obj;
}


function addMonthLines(color) {
  
  let rows = document.getElementsByTagName('tr');
  //console.log(rows);
  for (let i = 2; i < rows.length; i++) {
     let count = 1;    
    for (let x = 0; x < monthArr.length-1; x++) {
      count += monthArr[x];
      rows[i].children[count].style.borderLeft = '1px solid ' + color;
      
    }
    
  }
  
}
function removeMonthLines() {
  
  let rows = document.getElementsByTagName('tr');
  //console.log(rows);
  for (let i = 2; i < rows.length; i++) {
     let count = 1;    
    for (let x = 0; x < monthArr.length-1; x++) {
      count += monthArr[x];
      rows[i].children[count].style.borderLeft = 'none';
      
    }
    
  }
  
}
function addWeekLines(color) {
  
  let rows = document.getElementsByTagName('tr');
  //console.log(rows);
  for (let i = 2; i < rows.length; i++) {
     let count = 1;    
    for (let x = 0; x < weekArr.length-1; x++) {
      count += weekArr[x];
      rows[i].children[count].style.borderLeft = '1px solid ' + color;
      
    }
    
  }
  
}
function removeWeekLines() {
  
  let rows = document.getElementsByTagName('tr');
  //console.log(rows);
  for (let i = 2; i < rows.length; i++) {
     let count = 1;    
    for (let x = 0; x < weekArr.length-1; x++) {
      count += weekArr[x];
      rows[i].children[count].style.borderLeft = 'none';

    }
    
  }
  
}
