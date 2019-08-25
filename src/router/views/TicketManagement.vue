<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/main';
import { ticketPurchaseAttemptsGetters } from '@state/helpers'
import qs from 'qs';

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      bookingDetails: {
        roundTrip: false,
        journeyDate: new Date().toISOString().substr(0, 10),
        returningDate: new Date().toISOString().substr(0, 10),
        sourceCity: 'አዲስ አበባ',
        destinationCity: ''
      },
      states: {
        journeyDate: false,
        returningDate: false,
        searchMode: false
      },
    }
  },
  computed: {
    ...ticketPurchaseAttemptsGetters
  },
  methods: {
    fetchTicketPurchaseAttempts() {
      return this.TICKET_PURCHASE_ATTEMPTS;
    },
    swapCities: function () {
      let temp = this.bookingDetails.sourceCity;
      this.bookingDetails.sourceCity = this.bookingDetails.destinationCity;
      this.bookingDetails.destinationCity = temp;
    },
    showAvailableBuses () {
      this.$router.push(`/searchBuses?${
        qs.stringify({
          based_on: {...this.bookingDetails}
        })
      }`);
    }
  },
}
</script>

<template>
  <Layout no-back>
    <v-container grid-list-xl>
      <v-layout row wrap>

        <v-flex style="min-width: 70%;max-width: 70%;" row wrap>


      <VCard class="mt-2">
        <VCardTitle class="title">
          Ticket Purchase (payment) Attempts
        </VCardTitle>
        <VDivider/>
        <v-card-text>


<VLayout row wrap>
  <v-card
  v-for="destination,i in fetchTicketPurchaseAttempts()"
  :key="i"
    :loading="loading"
    class="mx-auto my-2"
    max-width="290"
  >
    <v-img
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title class="subheading">{{destination.title}}<div class="grey--text ml-4">4.5km of {{bookingDetails.sourceCity}}</div>
</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div class="body-1 text--primary">Available Buses (on <b>{{destination.journeyDate}}</b>): </div>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip v-for="bus in destination.availableBuses" :key="bus.title">{{bus}}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="green accent-4"
        outline
        text
        @click="reserve"
      >
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</VLayout>



        </v-card-text>

      </VCard>

        </v-flex>




    <VCard class="mt-2 ml-1">
      <VCardTitle green-title>
            <h3>Booking made simple!</h3>
      </VCardTitle>

  <v-card-text>

  </v-card-text></VCard>

      </v-layout>


    </v-container>
  </Layout>
</template>
