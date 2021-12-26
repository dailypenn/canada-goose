import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name);
    }
}

export function push(...args) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(...args));
    }
}