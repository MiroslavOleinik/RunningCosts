const date = new Date()
const initialState = {
  userName: 'admin',
  password: 'admin',
  currentScreen: 'Charges',
  currentMonth: date.getMonth(),
  editedCharge: {
    product: '',
    price: '',
    uri: '',
    index: '',
    month: '',
  },
  charges: {
    8: {
      runningCosts: [{
        chargeName: 'New phone',
        chargeCost: 200,
        billImage: 'https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png',
        isDeleted: false,
      },],
      billsSum: 200,
    },
    9: {
      runningCosts: [{
        chargeName: 'New macbook',
        chargeCost: 2000,
        billImage: 'https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png',
        isDeleted: false,
      }, {
        chargeName: 'Coca-Cola',
        chargeCost: 3,
        billImage: 'https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png',
        isDeleted: false,
      },],
      billsSum: 2003,
    }
  }
}

export function addCharge(charge) {
  return {
    type: 'ADD_CHARGE',
    payload: charge,
  }
}

export function changeScreen(screen) {
  return {
    type: 'CHANGE_SCREEN',
    payload: screen,
  }
}

export function deleteCharge(data) {
  return {
    type: 'DELETE_CHARGE',
    payload: data,
  }
}

export function setEditCharge(data) {
  return {
    type: 'SET_EDIT_CHARGE',
    payload: data,
  }
}

export function editCharge(data) {
  return {
    type: 'EDIT_CHARGE',
    payload: data,
  }
}

export function runningCharges(state = initialState, action) {
  const { type, payload } = action;
  const { charges, currentMonth } = state;
  let updatedCharges = { ...charges };
  switch (type) {
    case 'ADD_CHARGE':
      updatedCharges[currentMonth].runningCosts.push({
        chargeName: payload.name,
        chargeCost: payload.price,
        billImage: payload.image,
      });
      updatedCharges[currentMonth].billsSum += payload.price;
      return {
        ...state,
        charges: { ...updatedCharges },
      }
    case 'CHANGE_SCREEN':
      return {
        ...state,
        currentScreen: payload,
      }
    case 'DELETE_CHARGE':
        updatedCharges[payload.month].runningCosts[payload.index].isDeleted = true;
        updatedCharges[payload.month].billsSum -= updatedCharges[payload.month].runningCosts[payload.index].chargeCost;
      return {
        ...state,
        charges: { ...updatedCharges },
      }
    case 'EDIT_CHARGE':
      updatedCharges[payload.month].billsSum -= updatedCharges[payload.month].runningCosts[payload.index].chargeCost;
      updatedCharges[payload.month].runningCosts[payload.index].chargeName = payload.name;
      updatedCharges[payload.month].runningCosts[payload.index].chargeCost = payload.price;
      updatedCharges[payload.month].runningCosts[payload.index].billImage = payload.image;
      updatedCharges[payload.month].billsSum += updatedCharges[payload.month].runningCosts[payload.index].chargeCost;
      return {
        ...state,
        charges: { ...updatedCharges },
      }
    case 'SET_EDIT_CHARGE':
      return {
        ...state,
        editedCharge: { ...payload },
      }
    default:
      return {
        ...state
      };
  }
}
