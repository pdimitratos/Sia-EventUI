import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EventFilter from 'components/Timeline/EventFilter'
import Footer from 'components/Timeline/EventFooter'
import AddEventCard from 'components/Timeline/AddEventCard'
import Events from 'components/Timeline/Events'

import * as eventActions from 'actions/eventActions'
import * as eventTypeActions from 'actions/eventTypeActions'
import * as filterActions from 'actions/filterActions'

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ticketId: PropTypes.string,
    incidentId: PropTypes.number
  }

  componentDidMount () {
    const { eventTypes, events, incidentId, dispatch } = this.props
    updatePagination(incidentId, dispatch)
    fetchMissingEventTypes(eventTypes, events, dispatch)
    if (incidentId) {
      dispatch(filterActions.updateEventFilterIncidentId(incidentId))
    } else {
      dispatch(filterActions.clearFilterIncidentId())
    }
  }

  componentDidUpdate (oldProps) {
    const { dispatch, incidentId } = this.props
    if (oldProps.incidentId !== incidentId) {
      if (incidentId) {
        dispatch(filterActions.updateEventFilterIncidentId(incidentId))
      } else {
        dispatch(filterActions.clearFilterIncidentId())
      }
      updatePagination(incidentId, dispatch)
    }
  }

  render () {
    const { events, ticketId, incidentId, eventTypes } = this.props
    return (
      <div>
        {incidentId ? AddEventCard(incidentId) : null}
        <EventFilter eventTypes={eventTypes} />
        <Events events={events.pageList} ticketId={ticketId} incidentId={incidentId} />
        <Footer />
      </div>
    )
  }
}

const updatePagination = (incidentId, dispatch) => {
  dispatch(eventActions.pagination.filter(incidentId.toString()))
}

const fetchMissingEventTypes = (eventTypes, events, dispatch) => {
  const loadedEventTypeIds = Object.keys(eventTypes)
  const neededEventTypeIds = new Set(events.cacheList.map(event => event.eventTypeId))
  const uniqueNeededEventTypeIds = [...neededEventTypeIds]

  uniqueNeededEventTypeIds
    .filter(eventTypeId => !loadedEventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => dispatch(eventTypeActions.fetchEventType(missingEventTypeId)))
}

const mapStateToProps = (state, ownProps) => {
  const { events, eventTypes } = state

  return {
    ...ownProps,
    events: events.pages,
    eventTypes: eventTypes.records
  }
}

export default connect(mapStateToProps)(Timeline)
