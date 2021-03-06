import React from 'react'
import PropTypes from 'prop-types'
import BadgeStyled from 'components/elements/BadgeStyled'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import IconButtonStyled from 'components/elements/IconButtonStyled'
import Checkpoint from 'components/Incident/Checkpoint'

export const IncidentProgressName = (ticketId) => {
  return 'IncidentProgress' + (ticketId ? '_' + ticketId : '')
}

export const IncidentProgress = (ticketId) => [
  [
    [
      (key) =>
        <strong key={key}>
                    Incident Progress{ticketId ? ` for ${ticketId}` : ''}:
                    &nbsp;
                    <BadgeStyled badgeContent={4}>
                      <IconButtonStyled tooltip='Suggested actions'>
                        <NotificationsIcon />
                      </IconButtonStyled>
                    </BadgeStyled>
        </strong>
    ]
  ],
    [Checkpoint()]
]

IncidentProgress.propTypes = {
  ticketId: PropTypes.object
}
