
    /**
     * Control 需要使用的物件定義
     */
    export class ControlItem {

      /** Control Key Word */
      id: string;

      /** Control 顯示名稱 */
      name: string;

      /** Control 值 */
      value?: string | boolean;

      constructor(id: string, name: string, value?: string) {
        this.id = id;
        this.name = name;
        this.value = value;
      }
    }
