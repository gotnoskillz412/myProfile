import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'sfh-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.less']
})
export class TagsComponent implements OnInit {

    constructor() {
    }

    @Input()
    tag: string;

    @Input()
    onRemove: Function;

    @Input()
    index: number;

    ngOnInit() {
    }

}
