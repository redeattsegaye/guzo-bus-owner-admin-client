<script>
import appConfig from '@src/app.config';
import Layout from '@layouts/main';
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
      tab: null,
      disabled: false,
      price: null,
    }
  },
  mounted() {
    if (this.$route.query) {
      this.bookingDetails = qs.parse(this.$route.query).based_on;
      this.bookingDetails.roundTrip = this.bookingDetails.roundTrip === "true";
    }
  },
  methods: {
    fetchBusResults(details) {
      return [
        {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        },
                {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        },
                {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        },
                {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        },

                {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        },
                {
          title: 'ባህር ዳር',
          journeyDate: this.bookingDetails.journeyDate,
          availableBuses: [
            'Selam Bus'
          ]
        }
      ]
    },
    showAvailableBuses () {
      this.disabled = true;
      this.$router.replace(`/searchBuses?${
        qs.stringify({
          based_on: {...this.bookingDetails}
        })
      }`, () => {
        this.disabled = false;
      });
    }
  }
}
</script>

<template>
  <Layout no-back>

    <v-container class="ma-1 pa-1" grid-list-xl>
      <v-layout row wrap>
        <v-flex style="min-width: 65%;max-width: 65%;" row wrap>
          <VCard class="mt-2">
            <template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
            <VCardTitle class="title">
              select a bus you prefer
            </VCardTitle>
            <VDivider/>
            <v-card-text>
              <VLayout row wrap>
                <v-card
                  v-for="destination,i in fetchBusResults(bookingDetails)"
                  :key="i"
                  :loading="loading"
                  class="mx-auto my-2"
                  max-width="290">
                  <v-img
                    height="150"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
                  </v-img>
                  <v-card-title class="subheading">
                    {{destination.title}}<div class="grey--text ml-4">4.5km of {{bookingDetails.sourceCity}}</div>
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
        <VCard class="mt-3 ml-1 mb-3">
          <v-card-text>
            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="transparent"
              slider-color="green"
            >
              <v-tab>
                Filters
              </v-tab>
              <v-tab>
                Details
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>

                <v-form>
                  <vContainer>
                    <v-layout column>
  <v-range-slider
        v-model="price"
        min="1"
        max="1000"
        ticks="always"
        tick-size="5"
      >
  </v-range-slider>

                    </v-layout>

                    <v-switch
                      v-model="bookingDetails.roundTrip"
                      name="roundTrip"
                      color="green"
                      label="Round Trip"
                      @change="showAvailableBuses">
                    </v-switch>
                    <v-layout column>
                      <v-flex>
                        <v-menu
                          ref="journeyDate"
                          v-model="states.journeyDate"
                          :close-on-content-click="false"
                          :return-value.sync="bookingDetails.journeyDate"
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="bookingDetails.journeyDate"
                              label="Journey Date"
                              name="journeyDate"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="bookingDetails.journeyDate"
                            width="290"
                            color="green"
                          >
                            <v-btn text color="green" @click="states.journeyDate = false">Cancel</v-btn>
                            <v-btn text color="green" @click="$refs.journeyDate.save(bookingDetails.journeyDate);showAvailableBuses();">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex v-if="bookingDetails.roundTrip">
                      <v-menu
                        ref="returningDate"
                        v-model="states.returningDate"
                        :close-on-content-click="false"
                        :return-value.sync="bookingDetails.returningDate"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="bookingDetails.returningDate"
                            label="Returning Date"
                            name="returningDate"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="bookingDetails.returningDate"
                          width="290"
                          color="green"
                        >
                          <v-btn text color="green" @click="states.returningDate = false">Cancel</v-btn>
                          <v-btn text color="green" @click="$refs.returningDate.save(bookingDetails.returningDate);showAvailableBuses();">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    </v-layout>
                  </vContainer>
                </v-form>

              </v-tab-item>
              <v-tab-item>

                <v-form
                  ref="form"
                >
                <vContainer>
                  <v-layout column>
                      <v-text-field
                        v-model="bookingDetails.sourceCity"
                        label="Source City"
                        outline
                        name="source"
                        prepend-inner-icon="home"
                        prefix="From: "
                        :disabled="disabled"
                        required
                        @change="showAvailableBuses">
                      </v-text-field>
                      <v-text-field
                        v-model="bookingDetails.destinationCity"
                        label="Destination City"
                        name="destination"
                        outline
                        prefix="To: "
                        prepend-inner-icon="place"
                        :disabled="disabled"
                        required
                        @change="showAvailableBuses"
                      ></v-text-field>
                  </v-layout>

                  <v-switch
                    v-model="bookingDetails.roundTrip"
                    name="roundTrip"
                    :disabled="disabled"
                    color="green"
                    label="Round Trip"
                    @change="showAvailableBuses">
                  </v-switch>
                  <v-layout column>
                    <v-flex>
                      <v-menu
                        ref="journeyDate"
                        v-model="states.journeyDate"
                        :close-on-content-click="false"
                        :return-value.sync="bookingDetails.journeyDate"
                        transition="scale-transition"
                        offset-y
                        full-width
                                                :disabled="disabled"
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="bookingDetails.journeyDate"
                            label="Journey Date"
                            name="journeyDate"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="bookingDetails.journeyDate"
                          width="290"
                          color="green"
                        >
                          <v-btn text color="green" @click="states.journeyDate = false">Cancel</v-btn>
                          <v-btn text color="green" @click="$refs.journeyDate.save(bookingDetails.journeyDate);showAvailableBuses();">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex v-if="bookingDetails.roundTrip">
                    <v-menu
                      ref="returningDate"
                      v-model="states.returningDate"
                      :close-on-content-click="false"
                      :return-value.sync="bookingDetails.returningDate"
                      transition="scale-transition"
                      offset-y
                      full-width
                                              :disabled="disabled"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="bookingDetails.returningDate"
                          label="Returning Date"
                          name="returningDate"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="bookingDetails.returningDate"
                        width="290"
                        color="green"
                      >
                        <v-btn text color="green" @click="states.returningDate = false">Cancel</v-btn>
                        <v-btn text color="green" @click="$refs.returningDate.save(bookingDetails.returningDate);showAvailableBuses();">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  </v-layout>
                </vContainer>
                </v-form>

              </v-tab-item>

            </v-tabs-items>
           </v-card-text>
        </VCard>
      </v-layout>
    </v-container>
  </Layout>
</template>
