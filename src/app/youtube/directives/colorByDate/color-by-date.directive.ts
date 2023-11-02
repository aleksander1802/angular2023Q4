import {
    Directive, ElementRef, Input, OnInit, Renderer2
} from '@angular/core';

@Directive({
    selector: '[appColorByDate]',
})
export class ColorByDateDirective implements OnInit {
    @Input('appColorByDate') itemDate!: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        const millisecondsInDay = 1000 * 3600 * 24;
        const sixMonths = 180;
        const oneMonth = 30;
        const sevenDays = 7;
        const currentDate = new Date();
        const publicationDate = new Date(this.itemDate);
        const differenceInTime = currentDate.getTime() - publicationDate.getTime();
        const differenceInDays = differenceInTime / millisecondsInDay;
        let color = '';

        if (differenceInDays > sixMonths) {
            color = 'crimson';
        } else if (
            differenceInDays >= oneMonth
            && differenceInDays <= sixMonths
        ) {
            color = 'yellow';
        } else if (
            differenceInDays >= sevenDays
            && differenceInDays < oneMonth
        ) {
            color = 'green';
        } else {
            color = '#4081ec';
        }

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'border-bottom',
            `10px solid ${color}`
        );

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'border-bottom-right-radius',
            '10px'
        );
    }
}
