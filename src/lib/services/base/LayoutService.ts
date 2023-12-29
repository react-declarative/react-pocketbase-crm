import { Subject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

export class LayoutService {

    public readonly appbarLoaderSubject = new Subject<boolean>();
    public readonly modalLoaderSubject = new Subject<boolean>();

    public readonly promptOutgoing = new Subject<string>();
    public readonly promptIncoming = new Subject<string | null>();

    private _modalLoading = 0;
    private _appbarLoading = 0;

    get hasModalLoader() {
        return !!this._modalLoading;
    };

    get hasAppbarLoader() {
        return !!this._appbarLoading;
    };

    constructor() {
        makeAutoObservable(this);
    }

    setModalLoader = (loading: boolean) => {
        this._modalLoading = Math.max(this._modalLoading + (loading ? 1 : -1), 0);
        this.modalLoaderSubject.next(loading);
    };

    setAppbarLoader = (loading: boolean) => {
        this._appbarLoading = Math.max(this._appbarLoading + (loading ? 1 : -1), 0);
        this.appbarLoaderSubject.next(loading);
    };

    dropModalLoader = () => {
        this._modalLoading = 0;
        this.modalLoaderSubject.next(false);
    };

    dropAppbarLoader = () => {
        this._appbarLoading = 0;
        this.appbarLoaderSubject.next(false);
    };

    prompt = async (title: string) => {
        this.promptOutgoing.next(title);
        return await this.promptIncoming.toPromise();
    };

};

export default LayoutService;
