import React from 'react'
import '../css/SidePanel.css'

function SidePanel() {
  let collapsed = true
  return (

    <nav className={collapsed ? 'side-panel-collapsed': 'side-panel'}>
    </nav>

  )
}
export default SidePanel
