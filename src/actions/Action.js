export function addRow() {
  return {
    type:'ADD_ROW'
  };
}

export function deleteRow(id) {
  return {
    type: 'DELETE_ROW',
    id
  };
}

export function updateRow(id, item) {
  return {
    type: 'UPDATE_ROW',
    id,
    item
  };
}

export function undo() {
  return {
    type: 'UNDO'
  };
}
export function redo() {
  return {
    type: 'REDO'
  };
}

export function rebuildTable(marked) {
  return {
    type: 'REBUILD_TABLE',
    marked
  };
}