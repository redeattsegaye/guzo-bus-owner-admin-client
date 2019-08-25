<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/main';
import { journiesGetters, journiesMethods, authComputed, busesGetters, busesMethods, citiesGetters, citiesMethods } from '@state/helpers'
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
      returningDateShow: false,
      journeyDateShow: false,
      newJourney: {
        "name": "",
        "description": "",
        "defaultPrice": "string",
        "journeyDate": new Date().toISOString().slice(0, 10),
        "returningDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
        "totalKms": 0,
      },
      selected: [],
      journeyCities: {
        sourceCity: null,
        destinationCity: null
      },
      busForTheJourney: null,
      // snack: false,
      //   snackColor: '',
      //   snackText: '',
      //   max25chars: v => v.length <= 25 || 'Input too long!',
        // pagination: {},
        headers: [
          {
            text: 'Name',
            // align: 'left',
            // sortable: false,
            value: 'name',
          },
          // { text: 'Description', value: 'description' },
        ],
        items: [ { "name": "unnamed journey", },{ "name": "unnamed journey", } ]
    }
  },
  computed: {
    ...journiesGetters,
    ...busesGetters,
    ...citiesGetters,
    ...authComputed,
    getAvailableCities() {
      return this.CITIES.map(({ name }) => name);
    }
  },
  mounted () {
    setTimeout(() => {
      this.FETCH_JOURNIES(this.currentBusOwner.id)
      this.FETCH_BUSES(this.currentBusOwner.id)
      this.FETCH_CITIES();
    }, 3000);
  },
  methods: {
    ...journiesMethods,
    ...busesMethods,
    ...citiesMethods,
    async fetchMyJournies() {
      this.FETCH_JOURNIES(this.currentBusOwner.id);
      return this.JOURNIES;
    },
    async insertNewJourney() {
      let { data } = await this.INSERT_JOURNEY({
        access_token: this.currentBusOwner.id,
        journeyInstance: this.newJourney
      });
      await this.ADD_SOURCE_CITY({
        journeyId: data,
        cityName: this.journeyCities.sourceCity
      });
      await this.ADD_DESTINATION_CITY({
        journeyId: data,
        cityName: this.journeyCities.destinationCity
      });
      await this.ADD_TICKETS({
        journeyId: data,
        defaultPrice: this.newJourney.defaultPrice,
        seats: this.BUSES.filter((x) => x.id === this.busForTheJourney)[0].seats
      });
      // alert(this.journeyCities.sourceCity);

      // alert(this.journeyCities.destinationCity);
      await this.fetchMyJournies();
      this.dialog = false;
    },
    busFilter(city, queryText, itemText) {
      return city.name.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
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
          My Scheduled Trips
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
          Make a new Journey
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
New Journey Details
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="newJourney.name" box label="Journey Name"></v-text-field>
          <v-text-field v-model="newJourney.description" box label="Description (Optional)"></v-text-field>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field v-model="newJourney.defaultPrice" box label="Default Price (all Seats)"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="newJourney.totalKms" flat box label="Total Distance (in Killometers)"></v-text-field>
            </v-flex>
          </v-layout>
<v-autocomplete
        v-model="busForTheJourney"
        :items="BUSES"
        :filter="busFilter"
        item-value="id"
        solo
        color="white"
        item-text="name"
        label="Choose Bus for the trip"
      ></v-autocomplete>

<v-divider></v-divider>

  <v-layout row wrap>
    <v-flex xs6>
      <v-menu
        v-model="journeyDateShow"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="newJourney.journeyDate"
            label="Journey Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="newJourney.journeyDate" @input="journeyDateShow = false"></v-date-picker>
      </v-menu>
    </v-flex>


    <v-flex xs6>
      <v-select
        v-model="journeyCities.sourceCity"
        :items="getAvailableCities"
        item-text="name"
        label="Source City"
        solo
      ></v-select>
    </v-flex>
  </v-layout>


  <v-layout row wrap>
    <v-flex xs6>
      <v-menu
        v-model="journeyDateShow"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="newJourney.journeyDate"
            label="Journey Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="newJourney.journeyDate" @input="journeyDateShow = false"></v-date-picker>
      </v-menu>
    </v-flex>


    <v-flex xs6>
      <v-select
        v-model="journeyCities.destinationCity"
        :items="getAvailableCities"
        label="Destination City"
        solo
      ></v-select>
    </v-flex>
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
            @click="insertNewJourney()"
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
  <v-list two-line style="width:100%;">
          <template v-for="(item, index) in JOURNIES">
            <v-divider v-if="![0,1].includes(index)"></v-divider>
            <v-list-tile
              :key="item.name"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title class="title font-weight-light">{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary"><b>Price:</b> {{ item.defaultPrice }}
                <template v-if="item.returningDate">
                  | <b>Full Trip: </b> <v-icon small color="green">check_circle_outline</v-icon>                 </template>
                </v-list-tile-sub-title>
                <v-list-tile-sub-title><b>From:</b> {{ (item.sourceCity && item.sourceCity.name) ? item.sourceCity.name : "Unknown Source" }} <v-icon style="margin-bottom: -4px;">double_arrow</v-icon> <b>To:</b> {{ (item.destinationCity && item.destinationCity.name) ? item.destinationCity.name : "Unknown Destination" }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.journeyDate.slice(0,10) }} <template v-if="item.returningDate">- {{ item.returningDate.slice(0,10) }}</template></v-list-tile-action-text>

                <v-btn color="success" :to="`/journies/${item.id}`" outline>More</v-btn>
                <!-- <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon> -->
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>

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
