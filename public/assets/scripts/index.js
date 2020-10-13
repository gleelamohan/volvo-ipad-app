$(document).ready(function () {
function loadClick(){
	$(".accordian_click").on("click", function(){
		$('.slds-accordion__section').removeClass('slds-is-open');
		$(this).find('.slds-accordion__section').addClass('slds-is-open');
	});
}

	$.ajax("/dataurl", {
		success: function (data, status, xhr) {
			// success callback function
			data = data.replace("amqp://", "");

			var arr = data.split(":");

			var userName = arr[0];

			var arr1 = arr[1].split("@");

			var password = arr1[0];
		

			var arr3 = arr[1].split("/");

			var host = arr3[0];

			var port = 5672;
			var database = arr3[1];

			console.log(userName);
			console.log(password);
			console.log(host);
			console.log(port);
			console.log(database);

			const URL =
			data;

			const driverClassName = "owl.rmq.cloudamqp.com";

			$("#url").append(URL);
			$("#username").append(userName);
			$("#password").append(password);
		},
	});

	function loadMessages() {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: '/graphQL',
			data: JSON.stringify({
				query: `{
         messages{
          message,
					source,
					orderid,
					productname,
					price,
					createddate,
					owner,
					quantity,
					billingaddress,
					shippingaddress,
					status
         }
        }`,
			}),
			success: function (result) {
				console.log(result);
				var appendHTML = '';
				var appendHTML1 = '';
				var appendHTML2 = '';
			

			if(result.data.messages.length === 0){
				appendHTML1 = appendHTML1 + '<div style="text-align:center;"><span >No orders yet!!</span></div>';
			}else{
				let orders = result.data.messages.reduce((r, a) => {
					r[a.orderid] = [...r[a.orderid] || [], a];
					return r;
				 }, {});
				for (var k in orders){
					
         let startDt = new Date(orders[k][0].createddate).toLocaleDateString()
				//	appendHTML1 = appendHTML1 +`	<h1><span class="slds-page-header__title slds-truncate" title="Contacts (will truncate)">Order Id #  ${k}</span></h1>`;
					

					appendHTML2 =  appendHTML2 +`<li class="slds-accordion__list-item accordian_click">
    <section class="slds-accordion__section">
      <div class="slds-accordion__summary">
        <h2 class="slds-accordion__summary-heading">
          <button class="slds-button slds-button_reset slds-accordion__summary-action" aria-controls="${k}" aria-expanded="true" title="Accordion summary">
            <svg class="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>
            </svg>
            <span class="slds-accordion__summary-content">Order Id #  ${k}</span>
					</button>
					<span style="float:right">${startDt}</span>
        </h2>
      </div>
      <div class="slds-accordion__content" id="${k}">`;

			let newString= '';
					$.each(orders[k], function (i, row) {
						const dt = new Date(row.createddate);
					/*	appendHTML1 = appendHTML1 +`	<div style="margin-top:10px">Item ${i+1}</div>
						<ul class="slds-page-header__detail-list">
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Field 1">Product</div>
								<div title="Burlington Textile Weaving Plant Generator">
									<a href="javascript:void(0);">  ${row.productname}</a>
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Address (2)"> Shipping Address
								
								</div>
								<div title="Multiple Values">
								${row.shippingaddress}
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Close Date">Order Start Date</div>
								<div title="11/1/2018"> ${row.createddate}</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Opportunity Owner">Owner</div>
								<div title="Hyperlink">
									<div class="slds-media slds-media_small">
										<div class="slds-media__figure">
											<span class="slds-avatar slds-avatar_circle slds-avatar_x-small">
												<img alt="Person name" src="/assets/images/avatar2.jpg" title="User avatar" />
											</span>
										</div>
										<div class="slds-media__body">
											<a href="javascript:void(0);">${row.owner}</a>
										</div>
									</div>
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Amount">Price</div>
								<div title="$375,000.00">${row.price}</div>
							</li>
							<li class="slds-page-header__detail-item">
							<div class="slds-text-title slds-truncate" > Quantity
							
							</div>
							<div title="Multiple Values">
							${row.quantity}
							</div>
						</li>
						</ul>
						<hr/>
					`*/
					newString = newString +`	<div style="margin-top:10px">Item ${i+1}</div>
						<ul class="slds-page-header__detail-list">
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Field 1">Product</div>
								<div title="Burlington Textile Weaving Plant Generator">
									<a href="javascript:void(0);">  ${row.productname}</a>
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Address (2)"> Shipping Address
								
								</div>
								<div title="Multiple Values">
								${row.shippingaddress}
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Close Date">Order Start Date</div>
								<div title="11/1/2018"> ${dt}</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Opportunity Owner">Owner</div>
								<div title="Hyperlink">
									<div class="slds-media slds-media_small">
										<div class="slds-media__figure">
											<span class="slds-avatar slds-avatar_circle slds-avatar_x-small">
												<img alt="Person name" src="/assets/images/avatar2.jpg" title="User avatar" />
											</span>
										</div>
										<div class="slds-media__body">
											<a href="javascript:void(0);">${row.owner}</a>
										</div>
									</div>
								</div>
							</li>
							<li class="slds-page-header__detail-item">
								<div class="slds-text-title slds-truncate" title="Amount">Price</div>
								<div title="$375,000.00">${row.price}</div>
							</li>
							<li class="slds-page-header__detail-item">
							<div class="slds-text-title slds-truncate" > Quantity
							
							</div>
							<div title="Multiple Values">
							${row.quantity}
							</div>
						</li>
						</ul>
						<hr/>
					`

					});

				appendHTML2 = 	appendHTML2 + newString+`</div>
    </section>
  </li>`;
				}
			}
				 
				//$('#ordercontainer').append(appendHTML1);
				$('#accordian').append(appendHTML2);
				loadClick();
			},
		});
	}

	
	$("#close").on("click", function(){
		$("#modal").css("display","none");
	});
	$("#configuration").on("click", function(){

		$("#modal").css("display","block");
	});
	$('#send').on('click', function () {
		var data = {};
		data.source = 'Heroku';
		data.message = $('#messagebox').val();

		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/publish',
			success: function (data) {
				console.log('success');
				$('#messagebox').val('');
				//getQueue();
			},
		});
	});

	loadMessages();
});


