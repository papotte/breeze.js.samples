import { ElementRef } from '@angular/core';

export interface IModalDialog<T> {
    elementRef: ElementRef; // top level element in this component
    modalParent: any;  // a component
    modalResult: T;
    validationFn?: (x: T) => string;
    validationMessage?: string;
}

export abstract class ModalDialog<T> implements IModalDialog<T> {
    constructor(public elementRef: ElementRef) {

    }

    modalParent: any;  // a component
    modalResult: T;
    validationFn: (x: T) => string;
    validationMessage: string;
}

export function showModal<T>(component: IModalDialog<T>, parent: any, validateFn?: (x: any) => string): Promise<T> {
    let ele = component.elementRef.nativeElement.firstElementChild;
    let modalEle = jQuery(ele);
    component.modalParent = parent;
    component.validationMessage = null;
    if (validateFn) {
        component.validationFn = validateFn.bind(parent);
    }
    let p = new Promise((resolve, reject) => {
        modalEle.modal({ backdrop: 'static', keyboard: false }).on('hidden.bs.modal', () => {
            resolve(component.modalResult);
        });
    });
    return p;
}

export function returnModal<T>(component: IModalDialog<T>, result: T) {
    if (result != null && component.validationFn) {
        component.validationMessage = component.validationFn(result);
        if (component.validationMessage != null) return;
    }
    component.modalResult = result;
    hideModal(component);
}

export function hideModal<T>(component: IModalDialog<T>) {
    let ele = component.elementRef.nativeElement.firstElementChild;
    let modalEle = jQuery(ele);
    modalEle.modal("hide");
}