import { AppState } from './appState';
import { Action } from './action';
import { ActionType } from './actionType';

export class Reducer {

    public static reduce(oldState: AppState, action: Action): AppState {

        const newState = { ...oldState };

        switch (action.type) {
            // bring the username who logged in
            case ActionType.getUser:
                newState.logged = action.payload;
                break;

            // bring the cart of the connected user
            case ActionType.getCart:
                newState.cart = action.payload;
                break;

            // bring the cart of the connected user
            case ActionType.getCartItems:
                newState.cartItems = action.payload;
                break;

            // bring the order from the user
            case ActionType.getOrder:
                newState.order = action.payload;
                break;

            // add cart item
            case ActionType.addCartItem:
                newState.cartItems.push(action.payload);
                break;

            // delete one cart item
            case ActionType.deleteCartItem:
                for (let i = 0; i < newState.cartItems.length; i++) {
                    if (newState.cartItems[i]._id === action.payload._id) {
                        newState.cartItems.splice(i, 1);
                        break;
                    }
                }
                break;

            // delete all cart items
            case ActionType.deleteAllItems:
                const itemsQuantity = newState.cartItems.length - 1;
                for (let i = itemsQuantity; i >= 0; i--) {
                    newState.cartItems.splice(i, 1);
                }
                break;

        }

        return newState;
    }
}