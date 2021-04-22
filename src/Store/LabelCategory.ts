/*
 * @Author: your name
 * @Date: 2021-04-13 14:32:06
 * @LastEditTime: 2021-04-22 14:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /plugins/alex-poplar/src/Store/LabelCategory.ts
 */
import {Base} from "../Infrastructure/Repository";
import {shadeColor} from "../Infrastructure/Color";

export namespace LabelCategory {
    export interface JSON {
        readonly id: number;
        readonly text: string;
        readonly color?: string;
        readonly borderColor?: string;
        readonly "border-color"?: string;
        readonly borderBottom?: string;
        readonly "border-bottom"?: string;
        readonly "background"?: string
    }

    export interface Entity {
        readonly id: number;
        readonly text: string;
        readonly color: string;
        readonly borderColor: string;
        readonly borderBottom: string;
        readonly background: string
    }

    export class Repository extends Base.Repository<Entity> {
    }

    export interface Config {
        readonly defaultLabelColor: string
    }

    export namespace Factory {
        export function create(json: JSON, defaultColor: string): Entity {
            let borderColor = json.borderColor;
            let borderBottom = json.borderBottom;
            let color = json.color;
            let background = json.background
            if (!(json.borderColor) && json["border-color"]) {
                borderColor = json["border-color"];
            }
            if (!(json.borderBottom) && json["border-bottom"]) {
                borderBottom = json["border-bottom"]
            }
            if (!(json.color)) {
                color = defaultColor;
            }
            if (!(json.borderColor)) {
                borderColor = shadeColor(color!, -30);
            }
            return {
                id: json.id,
                text: json.text,
                color: color!,
                borderColor: borderColor!,
                borderBottom: borderBottom!,
                background: background!,
            };
        }

        export function createAll(json: Array<JSON>, config: Config): Array<Entity> {
            return json.map(it => create(it, config.defaultLabelColor));
        }
    }
}
