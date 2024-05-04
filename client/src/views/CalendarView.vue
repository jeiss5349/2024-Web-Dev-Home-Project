<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    initialView: {
      type: String,
      default: 'dayGridMonth'
    }
  },
  data() {
    const eventsData = JSON.parse(JSON.stringify(this.events?.map((d) => {
      const date = new Date(d.date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return {
        title: d.title,
        date: `${year}-${month.toString().length > 1 ? month : `0${month}`}-${day.toString().length > 1 ? day : `0${day}`}`
      }
    })));
    console.log(eventsData)
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        events: eventsData
      }
    }
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>