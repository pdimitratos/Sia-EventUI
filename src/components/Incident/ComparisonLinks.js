import React from 'react'
import { connect } from 'react-redux'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

export const ComparisonLinks = ({otherIncidentTicketIds, ticketId}) => {
    let key = 0
    return <div>
                Compare With:
                <Menu>
                    {otherIncidentTicketIds.map(otherTicketId =>
                        <MenuItem
                            key={key++}
                            primaryText={
                                <Link to={`/tickets/${ticketId}/compare/${otherTicketId}`}>
                                    {otherTicketId}
                                </Link>
                            }
                        />
                    )}
                </Menu>
            </div>

}

export const mapStateToProps = (state, ownProps) => {
    const { ticketId } = ownProps
    const thisIncidentId = state.tickets.map[ticketId].incidentId
    const otherIncidentTicketIds = Object.values(state.incidents.map)
        .filter(incident => incident.id !== thisIncidentId)
        .map(incident => incident.primaryTicket.originId)
    return {
        ticketId: ownProps.ticketId,
        otherIncidentTicketIds
    }
}

export default connect(mapStateToProps)(ComparisonLinks)