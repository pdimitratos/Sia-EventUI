import PropTypes from 'prop-types'
import { CollapsibleGridSet } from 'components/elements/CollapsibleGrid'
import { connect } from 'react-redux'
import { IncidentSummary, IncidentSummaryName } from 'components/Incident/IncidentSummary'
import { IncidentEvents, IncidentEventsName } from 'components/Incident/IncidentEvents'

export const DisplayIncident = ({incident, ticket, ticketSystem, expandSection, dispatch}) => {
  return CollapsibleGridSet('incident-container', 'incident-row', 'incident-col', [
    IncidentSummary({incident, ticket, ticketSystem, ticketOriginId: ticket.originId, dispatch}),
    IncidentEvents([[ticket.originId, incident.id]])
  ],
    [
      IncidentSummaryName(),
      IncidentEventsName()
    ],
    expandSection, dispatch)
}

DisplayIncident.propTypes = {
  incident: PropTypes.object,
  ticket: PropTypes.object,
  ticketSystem: PropTypes.object,
  expandSection: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  expandSection: state.expandSection
})

export default connect(mapStateToProps)(DisplayIncident)
