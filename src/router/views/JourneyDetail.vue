<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/main';
import { busesGetters, busesMethods, authComputed } from '@state/helpers'
import _ from 'lodash';
import qs from 'qs';

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      seatDialog: false,
      dialog: false,
      newSeat: {
        name: '',
        description: null,
        row: null,
        column: null
      },
      seatToEdit: {
        id: '',
        name: '',
        description: null,
        row: null,
        column: null
      },
      insertSeat: true,
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
      bus: {
        "name": "",
        "description": "",
        "model": "",
        "license_plate_code": "",
        "license_plate_number": "",
        "license_plate_location": "",
        "color": "",
        "rows": 0,
        "columns": 0,
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
  mounted () {
    setTimeout(() => this.fetchBusInformation(), 1500);
  },
  methods: {
    ...busesMethods,
    async fetchBusInformation() {
      if (!this.BUSES.length)
        await this.FETCH_BUSES(this.currentBusOwner.id);
      this.bus = this.BUSES.filter(({ id }) => this.$route.params.id === id)[0];

    },
    async insertNewBus() {
      await this.INSERT_BUS({
        access_token: this.currentBusOwner.id,
        busInstance: this.newBus
      });
      this.dialog = false;
    },
    async saveNewSeat() {
      await this.INSERT_SEAT({
        access_token: this.currentBusOwner.id,
        busId: this.bus.id,
        seatInstance: this.newSeat
      });
      await this.fetchBusInformation();
      this.seatDialog = false;
      this.$router.go();
    },
    async editSeat() {
      await this.EDIT_SEAT({
        access_token: this.currentBusOwner.id,
        busId: this.bus.id,
        seatInstance: this.seatToEdit
      });
      this.seatDialog = false;
    },
    range (start, end) {
      return Array.from(Array(end + 1).keys()).slice(start);
    },
    getSeat (row, col) {
      let seat = this.bus.seats.filter((x) => (x.row === row && x.column === col));
      return seat.length ? seat[0]: null
    },
    showNewSeatForm (row, col) {
      this.newSeat.row = row;
      this.newSeat.column = col;
      this.insertSeat = true;
      this.seatDialog = true;
    },
    showEditSeatForm (row, col, seat) {
      this.seatToEdit = seat;
      this.seatToEdit.row = row;
      this.seatToEdit.column = col;
      this.insertSeat = false;
      this.seatDialog = true;
    }

  },
}
</script>

<template>
  <Layout no-back>
    <v-container grid-list-xl>
      <v-layout class="headline">
         {{bus.name}}'s Details
      </v-layout>
      <v-layout row wrap>

        <v-flex row wrap>


      <VCard class="mt-2">
        <VCardTitle class="title">
          Bus Seats Configuration
          <v-spacer></v-spacer>
<template>
  <div class="text-center">
    <v-dialog
      v-model="seatDialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="green lighten-2"
          dark
          v-on="on"
        >
          New seat
        </v-btn>
      </template>

      <v-card v-if="insertSeat">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
Register a new Seat to this Bus
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="newSeat.name" box label="Seat Name"></v-text-field>
          <v-text-field v-model="newSeat.description" box label="Description (Optional)"></v-text-field>
  <v-divider></v-divider>
  <v-layout row wrap>
         <v-text-field v-model="newSeat.row" readonly disabled flat box label="Row (position)"></v-text-field>
          <v-text-field v-model="newSeat.column" readonly disabled box label="Column (position)"></v-text-field>

  </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
                    <v-btn
            color="primary"
            outline
            text
            @click="seatDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green white--text"
            text
            @click="saveNewSeat()"
          >
            Add seat
          </v-btn>
        </v-card-actions>
      </v-card>



            <v-card v-else>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
Edit Seat Information
        </v-card-title>

        <v-card-text>

          <v-text-field v-model="seatToEdit.name" box label="Seat Name"></v-text-field>
          <v-text-field v-model="seatToEdit.description" box label="Description (Optional)"></v-text-field>
  <v-divider></v-divider>
  <v-layout row wrap>
         <v-text-field v-model="seatToEdit.row" readonly flat box label="Row (position)"></v-text-field>
          <v-text-field v-model="seatToEdit.column" readonly box label="Column (position)"></v-text-field>

  </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
                    <v-btn
            color="primary"
            outline
            text
            @click="seatDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green white--text"
            text
            @click="editSeat()"
          >
            Save
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

<v-container fluid grid-list-sm style="border: 2px solid #b3d4fc;">
    <v-layout v-for="row in range(0, bus.rows - 1 )" :key="row" row wrap style="border: 1px solid grey;margin-bottom: 2px; min-height: 150px;">
      <v-flex d-flex xs12 sm12>
          <v-layout row wrap>
<template v-for="(seat,col) in range(0, bus.columns - 1).map((col) => getSeat(row, col))">
  <v-card
    class="mx-auto my-2 pt-2"
    color="#F9F9F9"
    min-width="150"
    max-width="150"
  >
  <div v-if="seat">
        <v-list-item class="pa-4" two-line>
      <v-list-item-content>
        <v-list-item-title class="headline py-2">{{ seat.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pa-4">
      <v-row align="center">
        <div class="font-weight-light">{{ seat.descrition }}</div>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <!-- <v-btn fab dark small color="primary">
        <v-icon dark>icon</v-icon>
      </v-btn> -->
      <v-btn text outline color="green" @click="showEditSeatForm(row, col, seat)" style="width:100%;" small>
      Edit
      </v-btn>
    </v-card-actions>
      </div>
      <div v-else>
        <v-card-title class="headline py-2 font-weight-thin">
        NO SEAT
        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-divider></v-divider>
            <v-card-actions>
      <v-btn text outline color="green" @click="showNewSeatForm(row, col)" style="width:100%;" small>
        <v-icon dark>add</v-icon>

      </v-btn>
    </v-card-actions>
      </div>
  </v-card>
</template>


          </v-layout>
      </v-flex>
</v-layout>
</v-container>

</VLayout>



        </v-card-text>

      </VCard>

        </v-flex>




    <VCard class="mt-2 ml-1">
        <VCardTitle class="title">
          Basic Information
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
          fab
          small
          v-on="on"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
  Edit Bus Basic Information
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
<v-list dense>
              <v-list-tile>
                <v-list-tile-content>Name:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.name }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Description:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.description }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Vehicle Model:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.model }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Licence Plate Code:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.license_plate_code }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>License Plate Number:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.license_plate_number }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>License Plate Location:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.license_plate_location }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Color:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.color }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Rows (of Seats):</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.rows }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Columns (of Seat):</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ bus.columns }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
  </v-card-text>

  </VCard>


      </v-layout>


    </v-container>
  </Layout>
</template>
