$(() => {
  // variables
  const FIXED_TIME = '13/09/2021 17:00'
  const FIXED_PARAMETER = '27,089.19 kWh'
  const FIXED_USERACCOUNT = {
    fullname: 'Nguyễn Văn A',
    uid: 'PD10000011297',
  }
  const TAB_NAME = $('ul.navbar-nav').find('.active').text().trim()
  const TARIFF_LIST = [
    {id: 1, value: '15,200.74', color: '#6C5DD3'},
    {id: 2, value: '6,775.64', color: '#FFA2C0'},
    {id: 3, value: '5,112.81', color: '#3F8CFF'},
  ]
  // ================variables
  //for demo test purposes
  $('#username').text(`${FIXED_USERACCOUNT.fullname}`)
  $('.welcome_user')
    .empty()
    .append(
      `Xin chào ${FIXED_USERACCOUNT.fullname}, <span style="color: #164399;">${TAB_NAME}</span>`
    )
  $('.summary_text').text(FIXED_PARAMETER)
  $('#user_info')
    .empty()
    .append(
      `${FIXED_USERACCOUNT.fullname}<span class="text-muted">${FIXED_USERACCOUNT.uid}</span>`
    )
  $('#time').text(FIXED_TIME)

  TARIFF_LIST.forEach((v, i) => {
    const html =
      `<div class="p-3 w-100 d-flex flex-column justify-content-center ${
        i === 0
          ? 'border-right'
          : i === TARIFF_LIST.length - 1
          ? 'border-left'
          : ''
      }">` +
      `<p class="text-muted" style="font-size:11px"><i class="fa-regular fa-folder-open" style="color: ${v.color}"></i> Biểu giá ${v.id}</p>` +
      `<h4>${v.value}</h4>` +
      `<div class="progress" style="height: 2px;">` +
      `<div class="progress-bar" style="background-color: ${
        v.color
      } !important; width: ${
        (parseFloat(v.value.replace(',', '')) / 30000) * 100
      }%;" role="progressbar"  aria-valuenow="${
        v.value
      }" aria-valuemin="0" aria-valuemax="30000"></div>` +
      `</div>` +
      `</div>`
    $('.tariff_list_container').append(html)
  })
}, jQuery)
