
function createTable(arr, row_key, col_key, val_key, n_row_headers, n_col_headers) {

 let data = {}; // A TEMPORARY OBJECT
 let cells = {};

 let table = document.createElement('div');
 table.classList.add('table');

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

     for (let x = n_min - n_row_headers; x <= n_max; x++) {

      let cell = createCell();
      row.appendChild(cell);
      x_col++;
      cell.classList.add('row_' + y_row);  // SO ROWS START AT 1
      cell.id = 'r' + y_row + 'c' + x_col;
      
      
      if (x >= n_min) {
        cell.classList.add('col_header');
        cell.appendChild(createInner(null)); // no value
      } else {
       cell.classList.add('header_header');
       cell.appendChild(createInner('x'));
      }
  
     }
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
  let row = document.createElement('div');
  row.classList.add('row');
  return row;
}
function createCell() {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  return cell;
}
function createInner(x) {
  let inner = document.createElement('div');
  inner.classList.add('inner');
  inner.innerHTML = x;
  return inner;
}
