import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.loadDxhtmlSchedularSettings();
  }

  loadDxhtmlSchedularSettings() {
    scheduler.i18n.setLocale({
      date: {
        month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      },
      labels: {
        dhx_cal_today_button: "Hoy",
        day_tab: "Día",
        week_tab: "Semana",
        month_tab: "Mes",
        new_event: "Nuevo evento",
        icon_save: "Guardar",
        icon_cancel: "Cancelar",
        icon_details: "Detalles",
        icon_edit: "Editar",
        icon_delete: "Eliminar",
        confirm_closing: "",
        //"Sus cambios se perderán, continuar ?"
        confirm_deleting: "El evento se borrará definitivamente, ¿continuar?",
        section_description: "Descripción",
        section_time: "Período",
        full_day: "Todo el día",
        confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?",
        section_recurring: "Repita el evento",
        button_recurring: "Impedido",
        button_recurring_open: "Permitido",
        button_edit_series: "Editar la serie",
        button_edit_occurrence: "Editar este evento",
    
        /*agenda view extension*/
        agenda_tab: "Día",
        date: "Fecha",
        description: "Descripción",
    
        /*year view extension*/
        year_tab: "Año",
    
        /*week agenda view extension*/
        week_agenda_tab: "Día",
    
        /*grid view extension*/
        grid_tab: "Reja",
    
        /* touch tooltip*/
        drag_to_create: "Drag to create",
        drag_to_move: "Drag to move",
    
        /* dhtmlx message default buttons */
        message_ok: "OK",
        message_cancel: "Cancel",
    
        /* wai aria labels for non-text controls */
        next: "Siguiente",
        prev: "Anterior",
        year: "Año",
        month: "Mes",
        day: "Día",
        hour: "Hora",
        minute: "Minuto",
    
        /* recurring event components */
        repeat_radio_day: "Diariamente",
        repeat_radio_week: "Semanalmente",
        repeat_radio_month: "Mensualmente",
        repeat_radio_year: "Anualmente",
        repeat_radio_day_type: "Cada",
        repeat_text_day_count: "dia",
        repeat_radio_day_type2: "Cada jornada de trabajo",
        repeat_week: " Repetir cada",
        repeat_text_week_count: "semana:",
        repeat_radio_month_type: "Repita",
        repeat_radio_month_start: "El",
        repeat_text_month_day: "dia cada ",
        repeat_text_month_count: "mes",
        repeat_text_month_count2_before: "cada",
        repeat_text_month_count2_after: "mes",
        repeat_year_label: "El",
        select_year_day2: "del",
        repeat_text_year_day: "dia",
        select_year_month: "mes",
        repeat_radio_end: "Sin fecha de finalización",
        repeat_text_occurences_count: "ocurrencias",
        repeat_radio_end3: "Fin",
        repeat_radio_end2: "Después de",
        month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"]
      }
    });
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
  }

  show_minical() {}

}
