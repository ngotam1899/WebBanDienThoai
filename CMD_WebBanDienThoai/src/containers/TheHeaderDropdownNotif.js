import React, {useState, useEffect} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import io from 'socket.io-client';



const TheHeaderDropdownNotif = () => {
  const [itemsCount, setItemsCount] = useState(5);
  const ENDPOINT = 'http://localhost:3000';
  let socket = io(ENDPOINT);

  useEffect(() => {
    socket.on('newOrder', res => {
      setItemsCount(itemsCount+res.newOrders);
    });
  }, [itemsCount]);

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-follow" className="mr-2 text-success" /> New user registered</CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User deleted</CDropdownItem>
        <CDropdownItem><CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
        <CDropdownItem><CIcon name="cil-basket" className="mr-2 text-primary" /> New client</CDropdownItem>
        <CDropdownItem><CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server overloaded</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif
