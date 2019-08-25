<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/main';
import { busesGetters, busesMethods, authComputed } from '@state/helpers'
import qs from 'qs';

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      dialog: false,
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
      newBus: {
        "name": "",
        "description": "",
        "model": "",
        "license_plate_code": "",
        "license_plate_number": "",
        "license_plate_location": "",
        "color": "",
        "rows": 0,
        "columns": 0,
      }
    }
  },
  computed: {
    ...busesGetters,
    ...authComputed
  },
  methods: {
    ...busesMethods,
    fetchMyBuses() {
      this.FETCH_BUSES(this.currentBusOwner.id);
      return this.BUSES;
    },
    async insertNewBus() {
      await this.INSERT_BUS({
        access_token: this.currentBusOwner.id,
        busInstance: this.newBus
      });
      this.dialog = false;
    }
  },
}
</script>

<template>
  <Layout no-back>
    <v-container grid-list-xl>
      <v-layout row wrap>

        <v-flex row wrap>


      <VCard class="mt-2">
        <VCardTitle class="title">
          Manage Buses you own
          <v-spacer></v-spacer>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="green lighten-2"
          dark
          v-on="on"
        >
          Register a New Bus
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
Insert a new Bus
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="newBus.name" box label="Bus Name"></v-text-field>
          <v-text-field v-model="newBus.description" box label="Description (Optional)"></v-text-field>
          <v-text-field v-model="newBus.model" box label="Vehicle Model"></v-text-field>
<v-layout row wrap>
            <v-text-field v-model="newBus.license_plate_code" box label="CODE" style="max-width:100px;"></v-text-field>
            <v-text-field v-model="newBus.license_plate_number" box label="PLATE-NUMBER" style="max-width:200px;"></v-text-field>
            <v-text-field v-model="newBus.license_plate_location" box label="LOCATION" style="max-width:150px;"></v-text-field>
  </v-layout>
  <v-layout row wrap>
         <v-text-field v-model="newBus.rows" flat box label="Rows (of seats)"></v-text-field>
          <v-text-field v-model="newBus.columns" box label="Columns (of seats)"></v-text-field>

  </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
                    <v-btn
            color="primary"
            outline
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green white--text"
            text
            @click="insertNewBus()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

        </VCardTitle>

        <VDivider/>
        <v-card-text>



<VLayout row wrap>
<template v-for="_ in fetchMyBuses()">
</template>
<template>
  <v-card
    v-for="(myBus, i) in BUSES"
    :key="i"
    class="mx-auto my-2 pt-2"
    color="#F9F9F9"
    min-width="300"
  >
    <v-list-item class="pa-4" two-line>
      <v-list-item-content>
        <v-list-item-title class="headline py-2">{{ myBus.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
        <v-divider></v-divider>

    <v-card-text class="pa-4">
      <v-row align="center">
        <div class="title font-weight-light">License plate:</div>
        <v-layout row>

        <v-layout column>
          <span class="display-3">{{ myBus.license_plate_number }}</span>
        </v-layout>
        <!-- <v-layout column> -->
                    <!-- <span class="font-weight-light title" style="border: 2px solid blue; padding-top: 2px;border-radius:50%;max-width:30px; max-height:30px;min-width:30px; min-height:30px;">{{ myBus.license_plate_code }}</span> -->
                              <!-- <span class="font-weight-light title">{{ myBus.license_plate_location }}</span> -->
        <!-- </v-layout> -->

        </v-layout>

      </v-row>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text outline color="green" :to="`/buses/${myBus.id}`">Manage Bus</v-btn>
    </v-card-actions>
  </v-card>
</template>

</VLayout>



        </v-card-text>

      </VCard>

        </v-flex>




      </v-layout>


    </v-container>
  </Layout>
</template>
