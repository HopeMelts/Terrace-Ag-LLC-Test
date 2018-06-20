const initialState = {
	prevItemList: [],
  	nowItemList: [],
  	nextItemList : [],
  	startId: 0
};

export default function itemList(state = initialState, action) {
	var nowItemList = state.nowItemList;
	var prevItemList = state.prevItemList;
	var nextItemList = state.nextItemList;
	var startId = state.startId;
  	switch (action.type) {
	    case 'ADD_ROW':
	    	prevItemList = [...prevItemList, nowItemList];
		    nextItemList = [];
	    	startId++;
		    nowItemList = [
		        ...nowItemList,
		        {
		          id: startId,
		          name: '',
		          cost: ''
		        }
		    ];
		    break;

	    case 'DELETE_ROW':
	      nowItemList = nowItemList.filter(item => item.id !== action.id);
	      prevItemList = [...prevItemList, nowItemList];
	      nextItemList = [];
	      break;

	    case 'UPDATE_ROW':
		    nowItemList = nowItemList.map(item =>
		        (item.id === action.id)
		          ? {...item, name: action.item.name, cost: action.item.cost}
		          : item
		    );
		    prevItemList = [...prevItemList, nowItemList];
	      	nextItemList = [];
	      	break;
	    case 'UNDO':
	    	nextItemList = [nowItemList, ...nextItemList];
	    	prevItemList = prevItemList.slice(0, -1);
	    	nowItemList = prevItemList[prevItemList.length - 1];
	      	break;
	    case 'REDO':
	    	nowItemList = nextItemList[0] || nowItemList;
	    	prevItemList = [...prevItemList, nowItemList];
	    	nextItemList = nextItemList.slice(1);
	      	break;
	    case 'REBUILD_TABLE':
	    	prevItemList = [...prevItemList, nowItemList];
	    	nowItemList = nowItemList.filter(item => action.marked.includes(item.id));
	    	nextItemList = [];
	      break;
		default:
	      	break;
	  	}
  	return {
	   	nowItemList,
	   	prevItemList,
	   	nextItemList,
	   	startId
	}
}
