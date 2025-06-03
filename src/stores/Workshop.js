export default class Workshop {
    constructor(workshop, inb, projet, end, a, ta, c, tc, d, td, dr, tdr, updateDate, updateContent, x, y, scalex, scaley, image) {
        this.workshop = workshop
        this.inb = inb
        this.project = projet
        this.end = end // fin de chantier
        this.a = a // assainissement
        this.ta = ta // total assainissement
        this.c = c // caracterisation
        this.tc = tc // total caracterisation
        this.d = d // dementelement
        this.td = td // total dementelement
        this.dr = dr // declassement radiologique
        this.tdr = tdr // total declassement radiologique
        this.updateDate = updateDate
        this.updateContent = updateContent
        this.image = image
        this.width = 302 * scalex
        this.height = 302 * scaley
        this.x = x - this.width / 2
        this.y = y - this.height / 2
        this.isSelected = false
    }

    getGlobalCoordinates() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
    }
}