// Овај јаваскрипт програм наводи све основне особине разломака
// у облику поступака разумљивих рачунару (алгоритми у облику функција).
// Обухваћено је градиво петог разреда основне школе.

function DeljenjeSaOstatkom(deljenik, delilac) {
	
  this.deljenik = deljenik
  this.delilac = delilac
  this.kolicnik = this.deljenik % this.delilac
  this.ostatak = this.deljenik - this.delilac * this.kolicnik

}

function Razlomak(b,c) {

// ОСНОВНЕ ОСОБИНЕ
	
	// Овај разломак је одређен бројиоцем и имениоцем.
	this.brojilac = b
	this.imenilac = c
   
   // Разломак се може претворити у децимални облик дељењем.
   try{
   	if( this.imenilac == 0 ) throw 0
   	this.decimalniBroj = this.brojilac / this.imenilac
   } catch (e) {
   	if(e==0) alert("Именилац разломка не сме бити једнак нули!")
   }

   // Разломак чији је бројилац нула и сам је једнак нули. Иначе је позитиван.
   this.jeNula = this.brojilac == 0
   
   // Реципрочна вредност разломка се добија заменом места имениоца и бројиоца.
   this.reciprocno = function() { 
      return new Razlomak( this.imenilac, this.brojilac )
   }

// ПРОШИРИВАЊЕ И СКРАЋИВАЊЕ

   // Проширивање разломка природним бројем n
   this.prosiritiSa = function(n) {
   	return new Razlomak( this.brojilac * n, this.imenilac * n )
   }

   // Скраћивање разломка природним бројем n
   this.skratitiSa = function(n) {
   	return new Razlomak( this.brojilac / n, this.imenilac / n )
   }
   
// ПРАВИ И НЕПРАВИ РАЗЛОМЦИ
   
   // Цео део неправог разломка добија се употребом операције дељење са остатком.
   // Знак % означава у језику јаваскрипт дељење са остатком. Остатак се одбацује.
   this.ceoDeo = this.brojilac % this.imenilac
   
   // Разломак је прави ако је бројилац мањи од имениоца,
   // а тада је цео део разломка једнак нули.
   this.jePravi = this.ceoDeo == 0

// САБИРАЊЕ И ОДУЗИМАЊЕ РАЗЛОМКА И ПРИРОДНОГ БРОЈА
   
   // Разломку додајемо природан број n тако што бројилац увећамо за n пута именилац.
   this.dodaj = function(n) {
   	return new Razlomak( this.brojilac + n * this.imenilac, this.imenilac )
   }

   // Од разломка одузимамо природан број n тако што бројилац умањимо за n пута именилац.
   this.oduzmi = function(n) {
   	return new Razlomak( this.brojilac - n * this.imenilac, this.imenilac )
   }
   
// МЕШОВИТИ БРОЈ
   
   // Прави део мешовитог броја остаје након одузимања целог дела.
   this.praviDeo = function() { 
      return this.oduzmi(this.ceoDeo)
   }
   
   // Ако је бројилац дељив имениоцем, онда је мешовити број једнак природном броју или нули.
   this.jeCeo = function() { 
      return this.praviDeo().jeNula
   }
   
// УПОРЕЂИВАЊЕ РАЗЛОМАКА БЕЗ ПРОШИРИВАЊА И СКРАЋИВАЊА - ЕУКЛИДОВ ТЕЖИ НАЧИН

   // Разумевање поређења разломака на овај начин је кључно
   // за разумевање Еуклидовог поступка који следи.

   // Поређење овог и оног разломка.
   this.jeJednakoSa = function(that) {
   	// Ако се цели делови овог и оног разломка разликују, они онда нису једнаки.
   	// Другим речима: Потребан, али не и довољан услов за једнакост разломака,
   	// је да им цели делови буду једнаки.
   	if( this.ceoDeo != that.ceoDeo ) return false
   	// Ако су им цели делови једнаки, треба упоредити праве разломке у мешовитом броју.
   	// Ако је један од два права разломка нула, они су једнаки само ако су оба нуле.
   	if( this.jeCeo || that.jeCeo ) return this.jeCeo && that.jeCeo 
   	// Мањи разломак је онај који има већу реципрочну вредност правог дела мешовитог броја.
   	return that.praviDeo().reciprocno().jeJednakoSa(this.praviDeo().reciprocno())
   }

   this.jeManjeOd = function(that) {
      // Ако су разломци једнаки, онда овај није мањи од оног.
   	if( this.jednakoSa(that) ) return false
   	// Ако се цели делови овог и оног разломка разликују,
   	// лако се може утврдити који од два разломка је мањи.
   	if( this.ceoDeo < that.ceoDeo ) return true
   	if( this.ceoDeo > that.ceoDeo ) return false
   	// Ако су им цели делови једнаки, треба упоредити праве разломке у мешовитом броју.
   	// Мањи разломак је онај који има већу реципрочну вредност правог дела мешовитог броја.
   	return that.praviDeo().reciprocno().jeManjeOd(this.praviDeo().reciprocno())
   }

   this.jeVeceOd = function(that) {
   	return that.jeManjeOd(this)
   }

// ЕУКЛИДОВ ПОСТУПАК ЗА НАЛАЖЕЊЕ НЗД БРОЈИОЦА И ИМЕНИОЦА
   
   this.euklidovNZD = function() {
   	// Ако је разломак природан број или нула,
   	return this.jeCeo() ?
   	// онда је бројилац разломка дељив са имениоцем,
   	// па је НЗД за бројилац и именилац једнак имениоцу, 
   	this.imenilac :
   	// а ако прави разломак није једнак нули, поновимо претходно описани поступак
   	// полазећи од реципрочне вредности правог дела мешовитог броја.
   	this.praviDeo().reciprocno().euklidovNZD()
   }

// КАНОНИЧКИ ОБЛИК (ФОРМА)
   
   // За разломак кажемо да је несводљив, или да је у каноничком облику, ако се не може скратити.
   this.jeNesvodljiv = function() { 
      return this.euklidovNZD() == 1
   }
   
   // Разломак доводимо у канонички облик тако што скратимо са НЗД за бројилац и именилац.
   this.kanonickiOblik = function() { 
      return this.skratitiSa( this.euklidovNZD() )
   }

// ОПЕРАЦИЈЕ СА РАЗЛОМЦИМА

   this.plus = function(that) {
   	return new Razlomak(
      	this.brojilac * that.imenilac +
      	that.brojilac * this.imenilac,
      	this.imenilac * that.imenilac
   	).kanonickiOblik()
   }

   // Ако је умањеник у бројиоцу новог разломка мањи од умањиоца, онда је this мање од that.
   // То је једноставнији начин за поређење разломака од раније наведеног.
   this.minus = function(that) {
   	if( this.jeManjeOd(that) ) return undefined
   	return new Razlomak(
      	this.brojilac * that.imenilac -
      	that.brojilac * this.imenilac,
      	this.imenilac * that.imenilac
   	).kanonickiOblik()
   }

   this.puta = function (that) {
   	return new Razlomak(
      	this.brojilac * that.brojilac,
      	this.imenilac * that.imenilac
   	).kanonickiOblik()
   }

   this.deljenoSa = function(that) {
   	return this.puta(that.reciprocno())
   }

   this.toForm = toForm
}

// Природан број или нула се претвара у разломак тако што му/јој се допише именилац 1.
var prirodanBroj = function(n) { return new Razlomak(n,1) }

