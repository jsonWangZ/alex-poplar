/*
 * @Author: your name
 * @Date: 2021-04-22 14:09:45
 * @LastEditTime: 2021-04-26 17:57:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/alex/plugins/alex-poplar/src/Develop/dev.ts
 */
import {Annotator} from "../Annotator";
// @ts-ignore
import * as data from "./test.json";
import {EventEmitter} from "events";
import {Label} from "../Action/Label";
import {Connection} from "../Action/Connection";
import {Content} from "../Action/Content";

window.onload = function () {
    (window as any).annotator = new Annotator(data, document.getElementById("container")!, {
        // connectionWidthCalcMethod: "line",
        // contentEditable: false,
        // // allowMultipleLabel: 'notAllowed', // 是否允许同一位置的多个Label
        // allowMultipleConnection: 'notAllowed', // 是否允许连接同两个Label的多个Connection
        // labelOpacity: 100,
        // selectingAreaStrip: null

        // lineHeight: 2,
        contentEditable: true,
        // allowMultipleLabel: 'notAllowed', // 是否允许同一位置的多个Label
        allowMultipleConnection: 'notAllowed', // 是否允许连接同两个Label的多个Connection
        labelOpacity: 100,
        unconnectedLineStyle: 'curve', // 点击一个Label时显示的连接线
        selectingAreaStrip: null
    });
    ((window as any).annotator as EventEmitter).on('textSelected', (startIndex: number, endIndex: number) => {
        (window as any).annotator.applyAction(Label.Create(0, startIndex, endIndex));
    });
    ((window as any).annotator as EventEmitter).on('labelClicked', (labelId: number) => {
        console.log(labelId);
    });
    ((window as any).annotator as EventEmitter).on('twoLabelsClicked', (fromLabelId: number, toLabelId: number) => {
        if (fromLabelId === toLabelId) {
            (window as any).annotator.applyAction(Label.Update(fromLabelId, 2));
        } else {
            (window as any).annotator.applyAction(Connection.Create(0, fromLabelId, toLabelId));
            console.log(fromLabelId, toLabelId);
        }
    });
    ((window as any).annotator as EventEmitter).on('labelRightClicked', (labelId: number, event: MouseEvent) => {
        (window as any).annotator.applyAction(Label.Delete(labelId));
        console.log(event.x, event.y);
    });
    ((window as any).annotator as EventEmitter).on('connectionRightClicked', (connectionId: number, event: MouseEvent) => {
        (window as any).annotator.applyAction(Connection.Delete(connectionId));
        console.log(event.x, event.y);
    });
    ((window as any).annotator as EventEmitter).on('contentInput', (position: number, value: string) => {
        (window as any).annotator.applyAction(Content.Splice(position, 0, value));
    });
    ((window as any).annotator as EventEmitter).on('contentDelete', (position: number, length: number) => {
        (window as any).annotator.applyAction(Content.Splice(position, length, ""));
    });
};
